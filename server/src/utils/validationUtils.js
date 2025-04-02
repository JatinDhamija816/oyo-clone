import { CONFIG } from './config.js';
import { REGEX } from './constants.js';

export const validateEmail = (email) => {
  return REGEX.EMAIL.test(email);
};

export const validatePhone = (phone) => {
  return REGEX.PHONE.test(phone);
};

export const validatePassword = (password) => {
  return REGEX.PASSWORD.test(password);
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
