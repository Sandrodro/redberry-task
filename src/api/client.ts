import { storage } from '@/utils/storage'
import { Endpoint } from './endpoints'

const BASE_URL = import.meta.env.VITE_API_URL as string
export const TOKEN_KEY = 'token'

const SERVER_ERROR_MESSAGE = 'Something went wrong on our side. Please try again.'
const NETWORK_ERROR_MESSAGE = 'Could not reach the server. Check your connection and try again.'

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
    // The text of a 5xx is for developers, so the user gets one generic message.
    super(
      status >= 500
        ? SERVER_ERROR_MESSAGE
        : (body.message ?? `Request failed with status ${status}`),
    )
    this.status = status
    this.errors = body.errors
    this.contested = body.contested
  }
}

/** Auth endpoints answer 401 for their own reasons (wrong password, stale token), so they never open the login modal. */
const NO_LOGIN_PROMPT: string[] = [Endpoint.Login, Endpoint.Register, Endpoint.Me, Endpoint.Logout]

type UnauthorizedHandler = () => Promise<boolean>

let unauthorizedHandler: UnauthorizedHandler | undefined
let loginInFlight: Promise<boolean> | undefined

/** Sets what happens on a 401: ask the user to log in. The handler resolves `true` after a login and `false` if the user cancels. */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | undefined) {
  unauthorizedHandler = handler
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
  isReplay = false,
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
  }).catch(() => {
    throw new ApiError(0, { message: NETWORK_ERROR_MESSAGE })
  })

  if (!response.ok) {
    if (
      response.status === 401 &&
      !isReplay &&
      unauthorizedHandler &&
      !NO_LOGIN_PROMPT.includes(path)
    ) {
      // Requests that fail together share one login. After it, each one is sent again with the new token.
      loginInFlight ??= unauthorizedHandler().finally(() => (loginInFlight = undefined))
      if (await loginInFlight) return request<T>(method, path, body, query, true)
    }
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
