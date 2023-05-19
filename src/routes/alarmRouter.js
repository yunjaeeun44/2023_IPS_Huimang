import { Router } from 'express';
import alarmController from '../controllers/alarmController.js';
import verifyToken from '../middleware/auth.js';

const router = Router();

router.get('', verifyToken, alarmController.getAlarm);

export default router;