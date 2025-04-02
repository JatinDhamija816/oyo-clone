import ApiError from './apiError.js';
import { CONFIG } from './config.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (CONFIG.NODE_ENV === 'development') {
      const logError = {
        message: error.message || 'Unknown error occurred',
        stack: error.stack || 'No stack trace available',
        request: {
          method: req.method,
          url: req.originalUrl,
          params: req.params,
          query: req.query,
          ...(CONFIG.LOG_REQUEST_BODY && {
            body:
              req.body && Object.keys(req.body).length > 0
                ? JSON.stringify(req.body, null, 2).slice(0, 500) + '...'
                : undefined,
          }),
        },
      };

      console.error(
        '🚨 AsyncHandler Error:',
        JSON.stringify(logError, null, 2)
      );
    }

    if (!(error instanceof ApiError)) {
      error = new ApiError(500, 'Internal Server Error');
    }

    next(error);
  });
};

export default asyncHandler;
