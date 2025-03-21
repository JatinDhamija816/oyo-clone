import { v4 as uuidv4 } from 'uuid';

class ApiError extends Error {
  /**
   * Constructs an ApiError instance.
   *
   * @param {number} statusCode - HTTP status code (e.g., 400, 500).
   * @param {string} [message="Internal Server Error"] - Error message.
   * @param {Array<{ field?: string, message: string }>|string|object} [errors=[]] - Array of error details, a single error object, or a string.
   * @param {any} [data=null] - Optional additional data.
   */
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

    super(message); // Call the parent Error constructor

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
    this.errorId = uuidv4(); // Generate a unique error ID for tracking

    // Capture stack trace only in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      Error.captureStackTrace(this, this.constructor);
    }

    // Freeze object to prevent modification after creation
    Object.freeze(this);
  }

  /**
   * Serializes the ApiError instance into a JSON object.
   * @returns {object}
   */
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

  /**
   * Returns a string representation of the error.
   * @returns {string}
   */
  toString() {
    return `[${this.timestamp}] ApiError (${this.statusCode}): ${this.message} | ID: ${this.errorId}`;
  }
}

export default ApiError;
