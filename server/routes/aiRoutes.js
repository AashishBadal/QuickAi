import express from 'express'
import { generateArticle } from '../config/controllers/aiController.js';
import { getAuth } from '@clerk/express';
import { auth } from '../middlewares/auth.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,generateArticle)

export default aiRouter