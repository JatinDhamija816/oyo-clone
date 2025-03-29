import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 [ErrorHandler]:', {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      ...(process.env.LOG_REQUEST_BODY === 'true' && { body: req.body }), // Log body only if enabled
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null,
      errorId: err.errorId,
      timestamp: err.timestamp,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errorId: err.errorId || null,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
