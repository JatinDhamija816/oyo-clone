import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_REQUEST_BODY: process.env.LOG_REQUEST_BODY === 'true',

  MONGO_URI: process.env.MONGO_URI || '',

  JWT: {
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || 'default_access_secret',
    REFRESH_SECRET:
      process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret',
    ACCESS_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '15m',
    REFRESH_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '10d',
  },

  CORS: {
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173'],
  },

  COOKIE: {
    DOMAIN: process.env.COOKIE_DOMAIN || 'localhost',
    SECURE: process.env.COOKIE_SECURE === 'true',
    SAME_SITE: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  },

  PASSWORD_POLICY: {
    MIN_LENGTH: Number(process.env.PASSWORD_MIN_LENGTH) || 8,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  },
  EMAIL: {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
  },
};
