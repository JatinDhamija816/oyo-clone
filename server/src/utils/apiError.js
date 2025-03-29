import { v4 as uuidv4 } from 'uuid';

class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Internal Server Error',
    errors = [],
    data = null
  ) {
    if (
      !Number.isInteger(statusCode) ||
      statusCode < 100 ||
      statusCode >= 600
    ) {
      throw new TypeError(
        `Invalid statusCode: ${statusCode}. Must be a valid HTTP status code (100-599).`
      );
    }

    if (typeof message !== 'string') {
      throw new TypeError(`Invalid message: ${message}. Must be a string.`);
    }

    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = Array.isArray(errors)
      ? errors.map((err) =>
          typeof err === 'object' && err !== null
            ? err
            : { message: String(err) }
        )
      : [];

    this.data = data;
    this.timestamp = new Date().toISOString();
    this.errorId = uuidv4();

    if (process.env.NODE_ENV !== 'production') {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.freeze(this);
  }

  toJSON() {
    return {
      errorId: this.errorId,
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      errors: this.errors,
      data: this.data,
      timestamp: this.timestamp,
    };
  }

  toString() {
    return `[${this.timestamp}] ApiError (${this.statusCode}): ${this.message} | ID: ${this.errorId}`;
  }
}

export default ApiError;
