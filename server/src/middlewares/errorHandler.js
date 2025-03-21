import ApiError from '../utils/apiError.js';

/**
 * Centralized Express error handler middleware.
 *
 * @param {Error} err - The error object thrown in the application.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 */
const errorHandler = (err, req, res, next) => {
  // Prevent sending multiple responses
  // res.headersSent prevents multiple responses, avoiding "Headers already sent" errors
  if (res.headersSent) return next(err);

  // Log the error (only in development)
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

  // If the error is an instance of ApiError, return structured response
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null,
      errorId: err.errorId, // Useful for debugging/tracking in logs
      timestamp: err.timestamp,
    });
  }

  // Generic error response for unhandled errors
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errorId: err.errorId || null,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in dev mode
  });
};

export default errorHandler;
