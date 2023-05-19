import { Router } from 'express';
import messageController from '../controllers/messageController.js';
import auth from '../middleware/auth.js'

const router = Router();

router.post('', auth, messageController.checkMessageAlarm);

export default router;