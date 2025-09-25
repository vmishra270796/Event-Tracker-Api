import jwt from 'jsonwebtoken';
import { env } from '../config/setting.js';

export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}
