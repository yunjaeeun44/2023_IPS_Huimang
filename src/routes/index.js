import { Router } from 'express';
import authRouter from './authRouter.js';
import chatRouter from './chatRouter.js';
import messageRouter from './messageRouter.js';
import analyRouter from './analyRouter.js';

const router = Router();

router.use('/analy', analyRouter);
router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);

export default router;