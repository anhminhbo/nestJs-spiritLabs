import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 8000,
  apiPrefix: process.env.API_PREFIX || '',
  logLevel: process.env.LOG_LEVEL || 'info',
}));
