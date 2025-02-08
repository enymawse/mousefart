class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { ApiError, NetworkError };
