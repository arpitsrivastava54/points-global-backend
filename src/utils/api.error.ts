export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
  }
}

