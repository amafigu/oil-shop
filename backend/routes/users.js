import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { decodeJWT } from '../middleware/decodeToken.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import {
  CreateUserSchema,
  LoginSchema,
} from '../middleware/validationSchemas/userSchema.js';
import db from '../models/index.js';

import {
  comparePassword,
  hashPassword,
} from '../middleware/passwordEncrypt.js';
dotenv.config();
const router = express.Router();

// admin routes

router.get('/', async (req, res) => {
  try {
    const users = await db.user.findAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/user/:email', decodeJWT, async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.params.email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
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

router.delete('/user/:email', decodeJWT, async (req, res) => {
  try {
    console.log('delete try ');
    const result = await db.user.destroy({
      where: { email: req.params.email },
    });
    if (!result) {
      console.log('delete if try !result 404 ');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('delete successfully ');
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log('delete err 500 ');
    return res.status(500).json({ message: err.message });
  }
});

router.put('/user/:email', decodeJWT, async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.params.email } });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.email = req.body.email || user.email;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    await user.save();

    return res.json({ message: 'User updated successfully', user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// End Admin routes

router.get('/current-user', decodeJWT, async (req, res) => {
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

router.post('/login', validateBody(LoginSchema), async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
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

    const isSecure = process.env.IS_SECURE;

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: isSecure,
    });

    return res.json({ message: 'Logged in successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/create', validateBody(CreateUserSchema), async (req, res) => {
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
