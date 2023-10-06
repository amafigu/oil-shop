import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { decodeJWT } from '../middleware/decodeToken.js';
import db from '../models/index.js';

import { comparePassword, hashPassword } from '../utils/passwordEncrypt.js';
dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.user.findAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/current-user', decodeJWT, async (req, res) => {
  console.log(res.json);
  return res.json({
    email: req.user.email,
    role: req.user.role,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

router.post('/login', async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: 'invalid username' });
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    console.log('user !!! ', user);

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_KEY,
      { expiresIn: '3600000' } // 1 hour
    );

    console.log('res.cookie ', res.cookie);
    const isSecure = process.env.IS_SECURE;
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: isSecure,
    });
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/register-admin', async (req, res) => {
  try {
    const existingUser = await db.user.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newAdmin = await db.user.create({
      ...req.body,
      password: hashedPassword,
      role: 'admin',
    });

    return res
      .status(201)
      .json({ message: 'Admin user created successfully', user: newAdmin });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const existingUser = await db.user.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await db.user.create({
      ...req.body,
      password: hashedPassword,
      role: 'guest',
    });

    return res
      .status(201)
      .json({ message: 'Guest user created successfully', user: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
