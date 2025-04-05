import { CONFIG } from './config.js';

export const USER_ROLES = {
  ADMIN: 'admin',
  HOTEL_OWNER: 'hotelOwner',
  USER: 'user',
};

export const COOKIE_NAMES = {
  ACCESS_TOKEN: `${USER_ROLES.USER}AccessToken`,
  REFRESH_TOKEN: `${USER_ROLES.USER}RefreshToken`,
  HOTEL_OWNER_ACCESS_TOKEN: `${USER_ROLES.HOTEL_OWNER}AccessToken`,
  HOTEL_OWNER_REFRESH_TOKEN: `${USER_ROLES.HOTEL_OWNER}RefreshToken`,
  ADMIN_ACCESS_TOKEN: `${USER_ROLES.ADMIN}AccessToken`,
  ADMIN_REFRESH_TOKEN: `${USER_ROLES.ADMIN}RefreshToken`,
};

export const ERROR_MESSAGES = {
  ALL_FIELDS_REQUIRED: 'All fields are required',
  INVALID_EMAIL: 'Invalid Email',
  INVALID_PHONE: 'Invalid Phone Number',
  PASSWORD_MISMATCH: 'Password and Confirm Password do not match',
  PASSWORD_POLICY: `Password must be at least ${CONFIG.PASSWORD_POLICY.MIN_LENGTH} characters long, with 1 uppercase, 1 lowercase, and 1 special character`,
  EMAIL_ALREADY_REGISTERED: 'Email already registered',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  PLEASE_WAIT: 'Too many requests. Please wait 1 minute',
  INVALID_OTP_FORMAT: 'Invalid OTP format',
  OTP_EXPIRED: 'OTP expired or invalid',
  INCORRECT_OTP: 'Incorrect OTP',
};

export const SUCCESS_MESSAGES = {
  DEFAULT_SUCCESS: 'Success',
  OTP_SEND_SUCCESS: 'OTP Send Successfully',
  HOTEL_OWNER_REGISTERED: 'New hotel owner registered successfully',
  OTP_VERIFIED: 'OTP verified successfully!',
};

export const PASSWORD_CONFIG = {
  MIN_LENGTH: CONFIG.PASSWORD_POLICY.MIN_LENGTH,
};

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{9,14}$/,
  PASSWORD: new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${CONFIG.PASSWORD_POLICY.MIN_LENGTH},}$`
  ),
};
