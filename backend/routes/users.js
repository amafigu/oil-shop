import express from 'express';
import db from '../models/index.js';
import { comparePassword } from '../utils/passwordEncrypt.js';

const router = express.Router();

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

    // Here you'd also generate a token or session to keep the user logged in.

    res.json({ message: 'Logged in successfully', role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an Admin User
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

    console.log({
      ...req.body,
      password: hashedPassword,
      role: 'admin',
    });

    console.log(newAdmin);

    res
      .status(201)
      .json({ message: 'Admin user created successfully', user: newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
