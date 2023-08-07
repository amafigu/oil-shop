import express from 'express';
const router = express.Router();
import db from '../models/index.js'

router.get('/', async (req, res) => {
  try {
    const products = await db.product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:productName', async (req, res) => {
  try {
    const product = await db.product.findOne({
      where: {
        name: req.params.productName,
      },
    });
    if (product === null) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
