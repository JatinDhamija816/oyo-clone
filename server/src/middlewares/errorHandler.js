import ApiError from '../utils/apiError.js';
import { CONFIG } from '../utils/config.js';

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (CONFIG.NODE_ENV === 'development') {
    console.error('🚨 [ErrorHandler]:', {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      ...(CONFIG.LOG_REQUEST_BODY && { body: req.body }),
    });
  }

  if (!(err instanceof ApiError)) {
    err = new ApiError(500, 'Internal Server Error');
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
    data: err.data || null,
    errorId: err.errorId,
    timestamp: err.timestamp,
    ...(CONFIG.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
