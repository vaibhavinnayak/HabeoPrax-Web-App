import { Usermodel } from '../db/schema.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv';
const router=express.Router();
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});


router.get('/user-progress', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = auth.split(' ').pop().trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const username = payload.username;

    const user = await Usermodel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      points: user.points || 0,
      streak: user.streak || 0,
      badges: user.badges || [],
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

export default router