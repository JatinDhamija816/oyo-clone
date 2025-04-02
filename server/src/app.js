import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import hotelOwnerRoutes from './routes/hotelOwner.routes.js';
import { CONFIG } from './utils/config.js';

const app = express();

console.log(`Allowed Origins:`, CONFIG.CORS.ALLOWED_ORIGINS);

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      CONFIG.CORS.ALLOWED_ORIGINS.includes(origin) ||
      'http://localhost:5173'
    ) {
      return callback(null, true);
    }
    console.warn(`🚫 CORS blocked request from: ${origin}`);
    return callback(new Error('CORS Policy Violation'), false);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use('/api/v1/hotelOwner', hotelOwnerRoutes);

app.use('*', (req, res) => {
  console.warn(`🔍 404 Not Found → ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

export default app;
