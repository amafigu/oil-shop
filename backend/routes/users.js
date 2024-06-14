import dotenv from 'dotenv';
import express from 'express';
import { decodeJWT } from '../middleware/decodeToken.js';
import { hashPassword } from '../middleware/passwordEncrypt.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import {
  createUserValidation,
  updateUserValidation,
} from '../middleware/validationSchemas/userSchema.js';
import db from '../models/index.js';

dotenv.config();
const router = express.Router();

router.get('/', decodeJWT, async (req, res) => {
  try {
    const users = await db.users.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.roles,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/user/:email', decodeJWT, async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.params.email },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.roles,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', decodeJWT, async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.roles,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/authenticated/:id', decodeJWT, async (req, res) => {
  try {
    const token = req.cookies.token || req.cookies.guestUserToken;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const currentUser = await db.users.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.roles,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(currentUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/role/:roleId', async (req, res) => {
  try {
    const userRole = await db.roles.findOne({
      where: { id: req.params.roleId },
    });
    return res.status(200).json(userRole);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/roles', decodeJWT, async (req, res) => {
  try {
    const roles = await db.roles.findAll();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', decodeJWT, async (req, res) => {
  try {
    const result = await db.users.destroy({
      where: { id: req.params.id },
    });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put(
  '/:id',
  decodeJWT,
  validateBody(updateUserValidation),
  async (req, res) => {
    try {
      const user = await db.users.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (req.body.email && req.body.email !== user.email) {
        const existingEmail = await db.users.findOne({
          where: { email: req.body.email },
        });
        if (existingEmail) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }

      user.email = req.body.email || user.email;
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.image = req.body.image || user.image;

      const updatedUser = await user.save();

      return res
        .status(200)
        .json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.post('/', validateBody(createUserValidation), async (req, res) => {
  try {
    const existingUser = await db.users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(422).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const customerRole = await db.roles.findOne({
      where: { name: 'customer' },
    });

    const newUser = await db.users.create({
      ...req.body,
      password: hashedPassword,
      roleId: customerRole.id,
    });

    const contextUser = {
      ...newUser.dataValues,
      password: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      role: customerRole.name,
    };

    return res.status(201).json({
      message: 'Customer user created successfully',
      user: contextUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post(
  '/create-admin',
  validateBody(createUserValidation),
  async (req, res) => {
    try {
      const existingUser = await db.users.findOne({
        where: { email: req.body.email },
      });
      if (existingUser) {
        return res.status(422).json({ message: 'Email already in use' });
      }
      const hashedPassword = await hashPassword(req.body.password);
      const customerRole = await db.roles.findOne({
        where: { name: 'admin' },
      });
      const newUser = await db.users.create({
        ...req.body,
        password: hashedPassword,
        roleId: customerRole.id,
      });
      const contextUser = {
        ...newUser.dataValues,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        role: customerRole.name,
      };
      return res.status(201).json({
        message: 'Customer user created successfully',
        user: contextUser,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

export default router;
