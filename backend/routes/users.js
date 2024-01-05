import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { decodeJWT } from '../middleware/decodeToken.js';
import {
  comparePassword,
  hashPassword,
} from '../middleware/passwordEncrypt.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import {
  createGuestUserValidation,
  createUserValidation,
  loginValidation,
  shippingDataValidation,
  updateUserValidation,
} from '../middleware/validationSchemas/userSchema.js';
import db from '../models/index.js';
dotenv.config();
const router = express.Router();

router.get('/verify-token', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    return res.json(decodedToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ALL USERS

router.get('/', decodeJWT, async (req, res) => {
  try {
    const users = await db.users.findAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET USER BY EMAIL
router.get('/user/:email', decodeJWT, async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.params.email },
      attributes: { exclude: ['password'] },
      include: [{ model: db.userRoles, as: 'role' }],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.get('/user/user-without-credentials/:email', async (req, res) => {
  console.log('getUserByEmail', req.params.email);
  try {
    const user = await db.users.findOne({
      where: { email: req.params.email },
      attributes: { exclude: ['password'] },
      include: [{ model: db.userRoles, as: 'role' }],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/current-user/:id', decodeJWT, async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const currentUser = await db.users.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.userRoles,
          as: 'role',
          attributes: ['name'],
        },
      ],
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = {
      ...currentUser.dataValues,
      role: currentUser.role.name,
    };
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/user/role/:roleId', async (req, res) => {
  try {
    const userRole = await db.userRoles.findOne({
      where: { id: req.params.roleId },
    });
    return res.json(userRole);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/user/:email', decodeJWT, async (req, res) => {
  try {
    const result = await db.users.destroy({
      where: { email: req.params.email },
    });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put(
  '/user/:id',
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

// End Admin routes
// TODO: only use the used id

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

router.post('/login', validateBody(loginValidation), async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.body.email },
      include: [{ model: db.userRoles, as: 'role' }],
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

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY,
      { expiresIn: '7200000' } // 2 hours
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

router.post('/create', validateBody(createUserValidation), async (req, res) => {
  try {
    const existingUser = await db.users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const customerRole = await db.userRoles.findOne({
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

// TODO: make a password and check crud in db
router.post(
  '/create-guest',
  validateBody(createGuestUserValidation),
  async (req, res) => {
    try {
      const existingUser = await db.users.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = await hashPassword('dummyPass');

      const newUser = await db.users.create({
        ...req.body,
        roleId: 4,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: 'Guest user created successfully',
        guestUser: newUser,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.post('/register-admin', async (req, res) => {
  try {
    const existingUser = await db.users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const userRole = await db.userRoles.findOne({
      where: { name: 'admin' },
    });

    const hashedPassword = await hashPassword(req.body.password);

    const newAdmin = await db.users.create({
      ...req.body,
      password: hashedPassword,
      roleId: userRole.id,
    });

    return res
      .status(201)
      .json({ message: 'Admin user created successfully', user: newAdmin });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/register-product-manager', async (req, res) => {
  try {
    const existingUser = await db.users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const userRole = await db.userRoles.findOne({
      where: { name: 'product_manager' },
    });

    const hashedPassword = await hashPassword(req.body.password);

    const newAdmin = await db.users.create({
      ...req.body,
      password: hashedPassword,
      roleId: userRole.id,
    });

    return res.status(201).json({
      message: 'Product Manager user created successfully',
      user: newAdmin,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/user/shipping-data/:id', async (req, res) => {
  try {
    const shippingData = await db.usersShippingData.findOne({
      where: { userId: req.params.id },
    });
    if (!shippingData) {
      return res
        .status(404)
        .json({ message: 'user has no shipping data saved' });
    }
    return res.json(shippingData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/user/shipping-data/:id', async (req, res) => {
  try {
    const shippingData = await db.usersShippingData.findOne({
      where: { userId: req.params.id },
    });
    if (!shippingData) {
      const newShippingData = await db.usersShippingData.create({
        ...req.body,
        userId: req.params.id,
      });

      return res.status(201).json({
        message: 'Shipping data created successfully',
        data: newShippingData,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put(
  '/user/shipping-data/:id',
  validateBody(shippingDataValidation),

  async (req, res) => {
    try {
      const shippingData = await db.usersShippingData.findOne({
        where: { userId: req.params.id },
      });

      if (!shippingData) {
        await db.usersShippingData.create({
          ...req.body,
          userId: req.params.id,
        });
      } else {
        shippingData.street = req.body.street || shippingData.street;
        shippingData.number = req.body.number || shippingData.number;
        shippingData.details = req.body.details || shippingData.details;
        shippingData.postalCode =
          req.body.postalCode || shippingData.postalCode;
        shippingData.city = req.body.city || shippingData.city;
        shippingData.state = req.body.state || shippingData.state;
        shippingData.country = req.body.country || shippingData.country;

        await shippingData.save();
      }

      return res.json({ message: 'Shipping data updated successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

export default router;
