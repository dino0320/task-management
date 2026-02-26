import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  salt_or_rounds: process.env.BCRYPT_SALT_OR_ROUNDS,
}));