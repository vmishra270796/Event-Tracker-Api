import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN ,
  COOKIE_NAME: 'auth_token',
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_SAMESITE: 'lax'
};
