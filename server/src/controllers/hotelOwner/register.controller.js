import asyncHandler from '../../utils/asyncHandler.js';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequiredFields,
} from '../../utils/validationUtils.js';
import ApiError from '../../utils/apiError.js';
import passwordHashing from '../../utils/passwordUtils.js';
import HotelOwner from '../../models/hotelOwner.model.js';
import { generateTokens } from '../../utils/tokenUtils.js';
import setAuthCookies from '../../utils/cookieUtils.js';
import ApiResponse from '../../utils/apiResponse.js';
import {
  ERROR_MESSAGES,
  PASSWORD_CONFIG,
  SUCCESS_MESSAGES,
  USER_ROLES,
} from '../../utils/constants.js';

const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (
    !validateRequiredFields({ name, email, phone, password, confirmPassword })
  ) {
    throw new ApiError(400, ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
  }

  if (!validateEmail(email)) {
    throw new ApiError(400, ERROR_MESSAGES.INVALID_EMAIL);
  }

  if (!validatePhone(phone)) {
    throw new ApiError(400, ERROR_MESSAGES.INVALID_PHONE);
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, ERROR_MESSAGES.PASSWORD_MISMATCH);
  }

  if (!validatePassword(password)) {
    throw new ApiError(400, ERROR_MESSAGES.PASSWORD_POLICY);
  }

  const existingOwner = await HotelOwner.findOne({ email });
  if (existingOwner) {
    throw new ApiError(400, ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED);
  }

  const hashedPassword = await passwordHashing(password);

  const newOwner = new HotelOwner({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  await newOwner.save();

  const { accessToken, refreshToken } = generateTokens(
    newOwner._id,
    newOwner.email
  );

  setAuthCookies(res, accessToken, refreshToken, USER_ROLES.HOTEL_OWNER);

  res
    .status(201)
    .json(
      new ApiResponse(201, SUCCESS_MESSAGES.HOTEL_OWNER_REGISTERED, newOwner)
    );
});

export default register;
