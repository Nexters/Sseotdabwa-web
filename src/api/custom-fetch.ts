import { ApiError } from "@/api/api-error"
import { getAccessToken } from "@/lib/token"

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "https://dev.buy-or-not.com"
  : "https://api.buy-or-not.com"

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/+$/, "")

function resolveApiUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith("/")) return `${API_BASE_URL}${url}`
  return `${API_BASE_URL}/${url}`
}

export async function customFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const accessToken = getAccessToken()

  const response = await fetch(resolveApiUrl(url), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options?.headers,
    },
  })

  const data = await response.json().catch(() => undefined)

  if (data?.errorCode) {
    throw new ApiError({
      message: data.message ?? "Unknown error",
      errorCode: data.errorCode,
      status: response.status,
    })
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T
}

export default customFetch
