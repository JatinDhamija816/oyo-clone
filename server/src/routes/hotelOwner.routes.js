import { Router } from 'express';
import register from '../controllers/hotelOwner/register.controller.js';
import sendOtp from '../controllers/hotelOwner/auth/sendOtp.controller.js';
import verifyOtp from '../controllers/hotelOwner/auth/verifyOtp.controller.js';

const router = Router();

router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.route('/register').post(register);

export default router;
