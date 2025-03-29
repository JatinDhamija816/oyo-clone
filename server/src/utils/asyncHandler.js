const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
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

    next(error);
  });
};

export default asyncHandler;
