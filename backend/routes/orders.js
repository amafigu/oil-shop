import express from 'express';
import db from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await db.orders.findAll();
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'This are no orders' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await db.orders.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
    });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'This user has no orders' });
  }
});

router.get('/last-order/:userId', async (req, res) => {
  try {
    const lastOrder = await db.orders.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    const orderId = lastOrder.map((order) => order.id);
    const orderItems = await db.orderItems.findAll({
      where: { orderId: orderId },
      include: [
        {
          model: db.products,
          include: [
            {
              model: db.productCategories,
              as: 'category',
            },
          ],
        },
      ],
    });
    return res.json({ orderItems, lastOrder });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error fetching cart items for this order' });
  }
});

router.get('/items/:orderId', async (req, res) => {
  try {
    const orderItems = await db.orderItems.findAll({
      where: { orderId: req.params.orderId },
      include: [
        {
          model: db.products,
          as: 'product',
          include: [
            {
              model: db.productCategories,
              as: 'category',
            },
          ],
        },
      ],
    });
    return res.json(orderItems);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error fetching cart items for this order' });
  }
});

router.post('/user/:userId', async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      return res.status(422).json({
        message: 'Can not find user for saving order, please try again',
      });
    } else {
      const order = await db.orders.create(req.body);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/items', async (req, res) => {
  try {
    const cartItem = await db.orderItems.create(req.body);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
