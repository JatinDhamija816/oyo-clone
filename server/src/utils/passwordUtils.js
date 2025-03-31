import bcrypt from 'bcrypt';
import { CONFIG } from './config.js';

const passwordHashing = async (password) => {
  if (
    typeof password !== 'string' ||
    password.length < CONFIG.PASSWORD_POLICY.MIN_LENGTH
  ) {
    throw new Error(
      `Password must be at least ${CONFIG.PASSWORD_POLICY.MIN_LENGTH} characters long.`
    );
  }

  try {
    const saltRounds = CONFIG.PASSWORD_POLICY.SALT_ROUNDS || 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error('❌ Error hashing password:', error);
    throw new Error('Failed to hash password.');
  }
};

export default passwordHashing;
