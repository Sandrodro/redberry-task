import { tokenStorage } from '../utils/tokenStorage'

const BASE_URL = import.meta.env.VITE_API_URL as string

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

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  query?: Record<string, QueryValue>
  json?: unknown
  form?: Record<string, string | number | boolean | File | null | undefined>
}

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

function buildForm(fields: NonNullable<RequestOptions['form']>) {
  const form = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue
    form.append(key, value instanceof File ? value : String(value))
  }
  return form
}

export async function api<T>(
  path: string,
  { method = 'GET', query, json, form }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = tokenStorage.get()
  if (token) headers.Authorization = `Bearer ${token}`

  let body: BodyInit | undefined
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(json)
  } else if (form) {
    body = buildForm(form)
  }

  const response = await fetch(`${BASE_URL}${path}${query ? buildQuery(query) : ''}`, {
    method,
    headers,
    body,
  })

  if (!response.ok) {
    throw new ApiError(response.status, await response.json().catch(() => ({})))
  }
  if (response.status === 204) return undefined as T
  return response.json()
}

/** For endpoints that wrap the payload as `{ data }`. */
export async function apiData<T>(path: string, options?: RequestOptions) {
  return (await api<{ data: T }>(path, options)).data
}
