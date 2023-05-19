import { Router } from 'express';
import chatController from '../controllers/chatController.js';
import auth from '../middleware/auth.js'

const router = Router();

router.post('', auth, chatController.postChat);

export default router;