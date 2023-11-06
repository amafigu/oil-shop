import express from 'express';
import db from '../models/index.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const orders = await db.userOrders.findAll({
      where: (userId = req.params.userId),
    });

    console.log('ORDERS API GET ALL', orders);
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'No order for this id' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (!user) {
      return res.status(422).json({
        message: 'Can not create order',
      });
    } else {
      const order = await db.products.create(req.body);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/cart-items', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
