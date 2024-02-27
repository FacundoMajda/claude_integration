import express from 'express';
import { PostApi } from '../controllers/request.controller';
import errorMiddleware  from '../middleware/anthropicErrors';

const router = express.Router();

router.post('/mensaje',[errorMiddleware], PostApi);

export default router;