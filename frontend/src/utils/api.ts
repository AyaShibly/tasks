const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export function getApiBaseUrl() {
  return API_BASE_URL
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  })

  const text = await response.text()
  const data = text ? (JSON.parse(text) as T | { message?: string | string[] }) : null

  if (!response.ok) {
    const message = Array.isArray((data as { message?: string | string[] } | null)?.message)
      ? (data as { message: string[] }).message.join(', ')
      : ((data as { message?: string } | null)?.message ?? 'Request failed.')

    throw new Error(message)
  }

  return data as T
}
