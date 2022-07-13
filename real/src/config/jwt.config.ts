import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
  secret: process.env.JWT_SECRET!,
  expirationTime: Number.parseInt(process.env.JWT_EXPIRATION_TIME!),
  cookieName: 'token',
}));
