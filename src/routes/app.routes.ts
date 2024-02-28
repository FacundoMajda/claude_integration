import express from 'express';
import { PostApi, ProcessFileApi } from '../controllers/request.controller';
import { uploadMiddleware } from '../middleware/uploadMiddleware';
import errorMiddleware from '../middleware/anthropicErrors';

const router = express.Router();

router.post('/mensaje', errorMiddleware, PostApi);
router.post('/upload', uploadMiddleware, errorMiddleware, ProcessFileApi);

export default router;