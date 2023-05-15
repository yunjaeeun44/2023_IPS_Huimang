import { Router } from 'express';
import authController from '../controllers/authController.js';
import verifyToken from "../middleware/auth.js";

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;