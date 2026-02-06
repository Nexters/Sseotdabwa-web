import { getAccessToken } from "@/lib/token"

export async function customFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const accessToken = getAccessToken()

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options?.headers,
    },
  })

  const data = await response.json().catch(() => undefined)

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T
}

export default customFetch
