import { Router } from 'express';
import analyController from '../controllers/analyController.js';
import verifyToken from '../middleware/auth.js';

const router = Router();

router.post('/sentence', verifyToken, analyController.postSentence);

export default router;