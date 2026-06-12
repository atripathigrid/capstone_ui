import { ENV } from "@/config/env";

// Typed fetch wrapper. This is the ONLY layer the frontend uses to reach data.
// There is no DB client, ORM, or connection string anywhere in the frontend
// bundle — every read/write goes frontend -> REST endpoint -> backend
// (Requirement 5).

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface MockResolver<T> {
  (): T | Promise<T>;
}

interface RequestOptions<T> {
  /** Endpoint path appended to the API base URL, e.g. "/dashboard/summary". */
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /**
   * Mock resolver used when VITE_USE_MOCKS is enabled, so the UI runs without a
   * backend. In production this is ignored and the real endpoint is hit.
   */
  mock?: MockResolver<T>;
  /** Simulated latency for the mock path (ms). */
  mockDelay?: number;
  /** Force the mock to throw, to exercise the error branch (Requirement 5). */
  failMock?: boolean;
}

function normalizeError(status: number, payload: unknown): ApiError {
  const message =
    (payload as { detail?: string; message?: string } | null)?.detail ??
    (payload as { message?: string } | null)?.message ??
    `Request failed with status ${status}`;
  return new ApiError(message, status);
}

export async function request<T>(options: RequestOptions<T>): Promise<T> {
  const { path, method = "GET", body, mock, mockDelay = 350, failMock } = options;

  if (ENV.USE_MOCKS && mock) {
    await new Promise((r) => setTimeout(r, mockDelay));
    if (failMock) {
      throw new ApiError("Tool execution failed — no fallback value served.", 502);
    }
    return mock();
  }

  const res = await fetch(`${ENV.API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // Auth header would be attached here from the session store.
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw normalizeError(res.status, data);
  }
  return data as T;
}
