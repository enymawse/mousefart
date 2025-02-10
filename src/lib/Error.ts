/**
 * Represents an API error with a status code.
 */
class ApiError extends Error {
  statusCode: number;

  /**
   * Creates an instance of ApiError.
   * @param statusCode - The HTTP status code of the error.
   * @param message - The error message.
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Represents a network-related error, such as a failed request.
 */
class NetworkError extends Error {
  /**
   * Creates an instance of NetworkError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
  }
}

export { ApiError, NetworkError };
