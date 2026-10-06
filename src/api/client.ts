import { storage } from '@/utils/storage'

const BASE_URL = import.meta.env.VITE_API_URL as string
export const TOKEN_KEY = 'token'

export class ApiError extends Error {
  status: number
  /** Field errors. Present on a form-level 422. Absent on a rule-level 422. */
  errors?: Record<string, string[]>
  /** Seat codes lost to another buyer. Present on 409. */
  contested?: string[]

  constructor(
    status: number,
    body: { message?: string; errors?: Record<string, string[]>; contested?: string[] },
  ) {
    super(body.message ?? `Request failed with status ${status}`)
    this.status = status
    this.errors = body.errors
    this.contested = body.contested
  }
}

type QueryValue = string | number | boolean | string[] | undefined

type FormFields = Record<string, string | number | boolean | File | null | undefined>

function buildQuery(query: Record<string, QueryValue>) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '') continue
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(`${key}[]`, item))
    } else {
      params.append(key, String(value))
    }
  }
  const string = params.toString()
  return string ? `?${string}` : ''
}

/** Pass the result as a request body to send `multipart/form-data`. */
export function toFormData(fields: FormFields) {
  const form = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue
    form.append(key, value instanceof File ? value : String(value))
  }
  return form
}

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: FormData | object,
  query?: Record<string, QueryValue>,
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = storage.get(TOKEN_KEY)
  if (token) headers.Authorization = `Bearer ${token}`

  let payload: BodyInit | undefined
  if (body instanceof FormData) {
    payload = body
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${path}${query ? buildQuery(query) : ''}`, {
    method,
    headers,
    body: payload,
  })

  if (!response.ok) {
    throw new ApiError(response.status, await response.json().catch(() => ({})))
  }
  if (response.status === 204) return undefined as T
  return response.json()
}

export const api = {
  get: <T>(path: string, options?: { query?: Record<string, QueryValue> }) =>
    request<T>('GET', path, undefined, options?.query),
  post: <T>(path: string, body?: FormData | object) => request<T>('POST', path, body),
  put: <T>(path: string, body?: FormData | object) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
}
