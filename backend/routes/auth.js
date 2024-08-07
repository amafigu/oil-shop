import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../middleware/passwordEncrypt.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import { loginValidation } from '../middleware/validationSchemas/userSchema.js';
import db from '../models/index.js';
dotenv.config();
const router = express.Router();

router.get('/user-token', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(403).json({ message: 'User is not authenticated' });
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    return res.status(200).json(decodedToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  const isSecure = process.env.IS_SECURE;

  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    path: '/',
    secure: isSecure,
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

router.post('/login', validateBody(loginValidation), async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.body.email },
      include: [
        {
          model: db.roles,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email' });
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const durationInMilliseconds = 4 * 60 * 60 * 1000;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY,
      { expiresIn: durationInMilliseconds }
    );

    const isSecure = process.env.IS_SECURE;

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: isSecure,
    });

    return res.status(200).json({ message: 'Logged in successfully', user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
