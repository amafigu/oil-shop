import dotenv from 'dotenv';
import express from 'express';
import { validateBody } from '../middleware/validationMiddleware.js';
import { shippingDataValidation } from '../middleware/validationSchemas/userSchema.js';
import db from '../models/index.js';
dotenv.config();
const router = express.Router();

router.get('/user/shipping-data/:id', async (req, res) => {
  try {
    let shippingData = await db.usersShippingData.findOne({
      where: { userId: req.params.id },
    });
    const user = await db.users.findOne({
      where: { id: req.params.id },
    });
    if (!shippingData && user) {
      const initialData = {
        userId: req.params.id,
        firstName: 'Please add data',
        lastName: 'Please add data',
        email: 'Please add data',
        street: 'Please add data',
        number: 'Please add data',
        details: 'Please add data',
        city: 'Please add data',
        state: 'Please add data',
        country: 'Please add data',
        postalCode: 'Please add data',
      };

      shippingData = await db.usersShippingData.create(initialData);
    }
    if (shippingData) {
      return res.status(200).json(shippingData);
    } else if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
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
    } else {
      return res.status(422).json({ message: 'User has already shippingData' });
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

      return res.json(shippingData);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

export default router;
