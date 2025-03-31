import { CONFIG } from './config.js';
import { REGEX } from './constants.js';

export const validateEmail = (email) => {
  if (!REGEX.EMAIL.test(email)) throw new Error('Invalid email format.');
  return true;
};

export const validatePhone = (phone) => {
  if (!REGEX.PHONE.test(phone)) throw new Error('Invalid phone number format.');
  return true;
};

export const validatePassword = (password) => {
  if (!REGEX.PASSWORD.test(password)) {
    throw new Error(
      `Password must be at least ${CONFIG.PASSWORD_POLICY.MIN_LENGTH} characters long, include uppercase, lowercase, number, and special character.`
    );
  }
  return true;
};

export const validateRequiredFields = (fields) => {
  return Object.entries(fields).every(([key, value]) => {
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null)
      return Object.keys(value).length > 0;
    return value !== undefined && value !== null;
  });
};
