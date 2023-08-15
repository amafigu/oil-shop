import express from 'express';
import db from '../models/index.js';
import { ProductCategorySchema } from '../utils/productSchema.js';
import { validateBody } from '../utils/validationMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productCategories = await db.productCategory.findAll();
    res.json(productCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', validateBody(ProductCategorySchema), async (req, res) => {
  try {
    const productCategory = await db.productCategory.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (productCategory) {
      res.status(400).json({
        message:
          'Can not add category with this name, please try with another name',
      });
    } else {
      const newProductCategory = await db.productCategory.create(req.body);
      res.status(201).json(newProductCategory);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
