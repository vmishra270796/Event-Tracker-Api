import { Router } from 'express';
import { signup, login, logout, me } from '../controllers/authController.js';
import { signupValidator, loginValidator } from '../validators/authValidators.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/me', requireAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
