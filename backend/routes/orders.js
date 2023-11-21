import express from 'express';
import db from '../models/index.js';

const router = express.Router();

router.get('/all/:userId', async (req, res) => {
  try {
    const orders = await db.userOrders.findAll({
      where: { userId: req.params.userId },
    });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'No order for this id' });
  }
});

/* router.get('/cart-items/:orderId', async (req, res) => {
  try {
    console.log('CART ITEMS REQ PARAMS ', req.params.orderId);
    const cartItems = await db.cartItems.findAll({
      where: { userOrderId: req.params.orderId },
    });
    console.log('CART ITEMS API GET ALL', cartItems);
    return res.json(cartItems);
  } catch (err) {
    return res.status(500).json({ message: 'No order for this id' });
  }
}); */

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
