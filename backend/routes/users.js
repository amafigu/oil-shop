import express from 'express';
import db from '../models/index.js';
import { comparePassword, hashPassword } from '../utils/passwordEncrypt.js';

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

router.post('/login', async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    //  generate a token or session to keep the user logged in.

    res.json({ message: 'Logged in successfully', role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    res
      .status(201)
      .json({ message: 'Admin user created successfully', user: newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {
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

    res
      .status(201)
      .json({ message: 'Guest user created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
