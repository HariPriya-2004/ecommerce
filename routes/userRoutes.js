import express from 'express';
import { create_user } from '../controllers/userController.js';

const router = express.Router();

router.post('/add_user', create_user); 
export default router;