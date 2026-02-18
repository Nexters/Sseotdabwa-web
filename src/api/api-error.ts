type ResponseStatusCode = number

interface ApiErrorOptions {
  message: string
  errorCode: string
  status: ResponseStatusCode
}

class ApiError extends Error {
  data: null = null
  message: string
  errorCode: string
  status: ResponseStatusCode

  constructor({ message, errorCode, status }: ApiErrorOptions) {
    super(message)
    this.name = "ApiError"
    this.message = message
    this.errorCode = errorCode
    this.status = status
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError
  }
}

export { ApiError }
export type { ResponseStatusCode }
