import { Router } from 'express';
import analyRouter from './analyRouter.js';
import chatRouter from './chatRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use('/analy', analyRouter);
router.use('/auth', authRouter);
router.use('/chat', chatRouter);

export default router;