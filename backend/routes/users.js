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
} from '../middleware/validationSchemas/userSchema.js';
import db from '../models/index.js';
dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.users.findAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/user/:email', decodeJWT, async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { email: req.params.email },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/customer/:id', async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
    });
    console.log('USER ', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
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

router.put('/user/:email', decodeJWT, async (req, res) => {
  try {
    const user = await db.users.findOne({ where: { email: req.params.email } });
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
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    image: req.user.image,
    roleId: req.user.roleId,
  });
});

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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        roleId: user.roleId,
        role: user.role.name,
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

router.post('/create', validateBody(createUserValidation), async (req, res) => {
  try {
    const existingUser = await db.users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await db.users.create({
      ...req.body,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: 'Customer user created successfully', user: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

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
        shippingData.street =
          req.body.street !== undefined &&
          req.body.street !== '' &&
          req.body.street !== null
            ? req.body.street
            : shippingData.street;
        shippingData.number =
          req.body.number !== undefined &&
          req.body.number !== '' &&
          req.body.number !== null
            ? req.body.number
            : shippingData.number;
        shippingData.details =
          req.body.details !== undefined &&
          req.body.details !== '' &&
          req.body.details !== null
            ? req.body.details
            : shippingData.details;
        shippingData.postalCode =
          req.body.postalCode !== undefined &&
          req.body.postalCode !== '' &&
          req.body.postalCode !== null
            ? req.body.postalCode
            : shippingData.postalCode;
        shippingData.city =
          req.body.city !== undefined &&
          req.body.city !== '' &&
          req.body.city !== null
            ? req.body.city
            : shippingData.city;
        shippingData.state =
          req.body.state !== undefined &&
          req.body.state !== '' &&
          req.body.state
            ? req.body.state
            : shippingData.state;
        shippingData.country =
          req.body.country !== undefined &&
          req.body.country !== '' &&
          req.body.country !== null
            ? req.body.country
            : shippingData.country;

        await shippingData.save();
      }

      return res.json({ message: 'Shipping data updated successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

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

export default router;
