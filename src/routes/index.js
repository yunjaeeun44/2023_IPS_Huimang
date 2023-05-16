import { Router } from 'express';
import analyRouter from './analyRouter.js';

const router = Router();

router.use('/analy', analyRouter);

export default router;