/**
 * Wraps an asynchronous Express route handler to automatically catch errors and pass them to the next middleware.
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} - A wrapped route handler that catches errors and passes them to the next middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // Enhanced logging in development mode
    if (process.env.NODE_ENV === 'development') {
      const logError = {
        message: error.message || 'Unknown error occurred',
        stack: error.stack || 'No stack trace available',
        request: {
          method: req.method,
          url: req.originalUrl,
          params: req.params,
          query: req.query,
          ...(process.env.LOG_REQUEST_BODY === 'true' && {
            body:
              req.body && Object.keys(req.body).length > 0
                ? JSON.stringify(req.body, null, 2).slice(0, 500) + '...' // ✅ Limit large bodies
                : undefined,
          }),
        },
      };

      console.error(
        '🚨 AsyncHandler Error:',
        JSON.stringify(logError, null, 2)
      );
    }

    // Pass the error to the next middleware
    next(error);
  });
};

export default asyncHandler;
