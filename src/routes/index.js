import { Router } from 'express';
import chatRouter from './chatRouter.js';

const router = Router();

router.use('/chat', chatRouter);

export default router;