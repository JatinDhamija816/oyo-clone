import nodemailer from 'nodemailer';
import asyncHandler from '../utils/asyncHandler.js';
import { CONFIG } from '../utils/config.js';

export const sendOtpEmail = asyncHandler(async (email, otp, type) => {
  const { USERNAME, PASSWORD } = CONFIG.EMAIL;

  const subjects = {
    register: 'Verify Your Email for Registration',
    forgotPassword: 'Reset Your Password',
    changeEmail: 'Verify Your New Email',
    changePassword: 'Confirm Your Password Change',
  };

  const messages = {
    register: `Your OTP for email verification is: <strong>${otp}</strong>.`,
    forgotPassword: `Your OTP for resetting your password is: <strong>${otp}</strong>.`,
    changeEmail: `Your OTP for verifying your new email is: <strong>${otp}</strong>.`,
    changePassword: `Your OTP for confirming password change is: <strong>${otp}</strong>.`,
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: { user: USERNAME, pass: PASSWORD },
  });

  const mailOptions = {
    from: USERNAME,
    to: email,
    subject: subjects[type] || 'Your OTP Code',
    html: `
      <p>Dear user,</p>
      <p>${messages[type] || `Your OTP is: <strong>${otp}</strong>.`}</p>
      <p>This OTP is valid for 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
});
