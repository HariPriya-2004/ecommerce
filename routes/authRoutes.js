import express from 'express';
import { user_login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', user_login);

export default router;