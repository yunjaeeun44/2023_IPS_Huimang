import { Router } from 'express';
import authController from '../controllers/authController.js';
import verifyToken from "../middleware/auth.js";

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/sms/check', authController.checkAuthCode);
router.post('/sms', authController.sendsms);

export default router;