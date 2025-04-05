import Redis from 'ioredis';
import crypto from 'crypto';
import asyncHandler from '../../../utils/asyncHandler.js';
import { validateEmail } from '../../../utils/validationUtils.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../utils/constants.js';
import ApiError from '../../../utils/apiError.js';
import ApiResponse from '../../../utils/apiResponse.js';

const redisClient = new Redis();

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!validateEmail(email)) {
    throw new ApiError(400, ERROR_MESSAGES.INVALID_EMAIL);
  }

  if (!otp || otp.length !== 6 || isNaN(otp)) {
    throw new ApiError(400, ERROR_MESSAGES.INVALID_OTP_FORMAT);
  }

  const storedHashedOtp = await redisClient.get(`otp:${email}`);

  if (!storedHashedOtp) {
    throw new ApiError(400, ERROR_MESSAGES.OTP_EXPIRED);
  }

  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

  if (hashedOtp !== storedHashedOtp) {
    throw new ApiError(400, ERROR_MESSAGES.INCORRECT_OTP);
  }

  await redisClient.del(`otp:${email}`);

  res.status(200).json(new ApiResponse(200, SUCCESS_MESSAGES.OTP_VERIFIED));
});

export default verifyOtp;
