import { verifyToken } from '../utils/jwt.js';
import { env } from '../config/setting.js';

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies[env.COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
