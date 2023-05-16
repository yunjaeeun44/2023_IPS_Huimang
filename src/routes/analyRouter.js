import { Router } from 'express';
import analyController from '../controllers/analyController.js';

const router = Router();

router.post('/sentence', analyController.postSentence);

export default router;