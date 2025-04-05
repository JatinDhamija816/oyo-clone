import Redis from 'ioredis';
const redisClient = new Redis();
import crypto from 'crypto';
import asyncHandler from '../../../utils/asyncHandler.js';
import { validateEmail } from '../../../utils/validationUtils.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../utils/constants.js';
import ApiError from '../../../utils/apiError.js';
import { sendOtpEmail } from '../../../services/sendOtp.service.js';
import ApiResponse from '../../../utils/apiResponse.js';

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!validateEmail(email)) {
    throw new ApiError(400, ERROR_MESSAGES.INVALID_EMAIL);
  }

  const existingOtp = await redisClient.get(`otp:${email}:limit`);
  if (existingOtp) {
    throw new ApiError(429, ERROR_MESSAGES.PLEASE_WAIT);
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

  await redisClient.setex(`otp:${email}`, 600, hashedOtp);

  await redisClient.setex(`otp:${email}:limit`, 60, '1');

  await sendOtpEmail(email, otp, 'register');

  res.status(200).json(new ApiResponse(200, SUCCESS_MESSAGES.OTP_SEND_SUCCESS));
});

export default sendOtp;
