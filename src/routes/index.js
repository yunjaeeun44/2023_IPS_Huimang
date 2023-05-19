import { Router } from 'express';
import authRouter from './authRouter.js';
import chatRouter from './chatRouter.js';
import messageRouter from './messageRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);

export default router;