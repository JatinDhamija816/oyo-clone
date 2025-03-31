import jwt from 'jsonwebtoken';
import { CONFIG } from './config.js';

const generateToken = (userId, email, secret, expiresIn) => {
  if (!userId || !email) {
    throw new Error('Missing userId or email for token generation.');
  }

  try {
    return jwt.sign({ userId, email }, secret, { expiresIn });
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed.');
  }
};

export const generateTokens = (userId, email) => {
  return {
    accessToken: generateToken(
      userId,
      email,
      CONFIG.JWT.ACCESS_SECRET,
      CONFIG.JWT.ACCESS_EXPIRATION
    ),
    refreshToken: generateToken(
      userId,
      email,
      CONFIG.JWT.REFRESH_SECRET,
      CONFIG.JWT.REFRESH_EXPIRATION
    ),
  };
};
