import { ENV } from '@/config';

/**
 * Typed fetch wrapper. This is the ONLY way the frontend reaches data.
 * There is no DB client / connection string / ORM in the bundle — every
 * read & write goes frontend -> REST endpoint -> backend service -> tool ->
 * repository -> DB. Errors are normalized so element error-states never show
 * a garbage fallback value.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${ENV.apiBaseUrl}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...init,
  });
  if (!res.ok) {
    throw new ApiError(`Request failed: ${path}`, res.status);
  }
  return (await res.json()) as T;
}

export async function apiSend<T>(
  path: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${ENV.apiBaseUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    throw new ApiError(`Request failed: ${path}`, res.status);
  }
  return (await res.json()) as T;
}
