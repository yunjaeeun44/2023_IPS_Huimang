import { Router } from 'express';
import analyRouter from './analyRouter.js';
import chatRouter from './chatRouter.js';
import authRouter from './authRouter.js';
import alarmRouter from './alarmRouter.js';

const router = Router();

router.use('/analy', analyRouter);
router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/alarm', alarmRouter);

export default router;