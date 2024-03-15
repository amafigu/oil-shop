import express from 'express';
import db from '../models/index.js';

const router = express.Router();

router.get('/all/:userId', async (req, res) => {
  try {
    const orders = await db.userOrders.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
    });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'This user has no orders' });
  }
});

router.get('/last-order-items/:userId', async (req, res) => {
  try {
    const lastOrder = await db.userOrders.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    const orderId = lastOrder.map((order) => order.id);
    const cartItems = await db.cartItems.findAll({
      where: { userOrderId: orderId },
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
    return res.json({ cartItems, lastOrder });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error fetching cart items for this order' });
  }
});

router.get('/cart-items/:orderId', async (req, res) => {
  try {
    const cartItems = await db.cartItems.findAll({
      where: { userOrderId: req.params.orderId },
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
    return res.json(cartItems);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error fetching cart items for this order' });
  }
});

router.post('/create/:userId', async (req, res) => {
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
      const order = await db.userOrders.create(req.body);
      res.status(201).json(order);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/cart-items', async (req, res) => {
  try {
    const cartItem = await db.cartItems.create(req.body);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
