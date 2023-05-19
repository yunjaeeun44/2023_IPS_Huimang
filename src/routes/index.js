import { Router } from 'express';
import chatRouter from './chatRouter.js';
import messageRouter from './messageRouter.js';
import analyRouter from './analyRouter.js';
import authRouter from './authRouter.js';
import alarmRouter from './alarmRouter.js';

const router = Router();

router.use('/analy', analyRouter);
router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/alarm', alarmRouter);
router.use('/message', messageRouter);

export default router;