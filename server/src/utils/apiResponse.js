class ApiResponse {
  /**
   * Constructs an ApiResponse instance.
   *
   * @param {number} statusCode - HTTP status code (e.g., 200, 201, 400).
   * @param {string} [message="Success"] - Response message.
   * @param {any} [data={}] - The response payload.
   */
  constructor(statusCode = 200, message = 'Success', data = {}) {
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

    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = this._formatData(data);
    this.timestamp = new Date().toISOString();

    // Freeze to prevent further modifications
    Object.freeze(this);
  }

  /**
   * Ensures data is in a structured format.
   * If data is a primitive value, wraps it in an object.
   *
   * @param {any} data - The response payload.
   * @returns {object}
   */
  _formatData(data) {
    return data !== null && typeof data === 'object' ? data : { result: data };
  }

  /**
   * Converts ApiResponse instance to a JSON-friendly format.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      data: this.data,
      timestamp: this.timestamp,
    };
  }

  /**
   * Returns a string representation of the response.
   *
   * @returns {string}
   */
  toString() {
    return `[${this.timestamp}] ApiResponse (${this.statusCode}): ${this.message}`;
  }
}

export default ApiResponse;
