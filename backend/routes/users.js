import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middleware/auth.js';
import db from '../models/index.js';

import { comparePassword, hashPassword } from '../utils/passwordEncrypt.js';
dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
    console.log(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/current-user/:email', authenticateJWT, async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.params.email } });
    if (!user) {
      return res.status(404).json({ message: 'invalid user' });
    }
    console.log('user current ', user);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

router.post('/login', async (req, res) => {
  console.log('routes login req.body', req.body);
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not registered, please check your email' });
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    //  generate a token or session to keep the user logged in.
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    console.log('routes login ', token);
    console.log({ userId: user.id, email: user.email });
    return res.json({
      message: 'Logged in successfully',
      role: user.role,
      token,
    });
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
    res.status(500).json({ message: err.message });
  }
});

export default router;
