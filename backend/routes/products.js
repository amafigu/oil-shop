import express from 'express';
import db from '../models/index.js';
import {
  CreateProductSchema,
  ProductNameParamSchema,
  UpdateProductSchema,
} from '../utils/productSchema.js';
import { validateBody, validateParams } from '../utils/validationMiddleware.js';
const router = express.Router();

router.post('/create', validateBody(CreateProductSchema), async (req, res) => {
  try {
    const product = await db.product.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (product) {
      res.status(422).json({
        message:
          'Can not add product with this name, please try with another name',
      });
    } else {
      const product = await db.product.create(req.body);
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get(
  '/:productName',
  validateParams(ProductNameParamSchema),
  async (req, res) => {
    try {
      const product = await db.product.findOne({
        where: {
          name: req.params.productName,
        },
        include: [
          {
            model: db.productCategory,
            as: 'category',
          },
        ],
      });
      if (product === null) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete(
  '/:productName',
  validateParams(ProductNameParamSchema),
  async (req, res) => {
    try {
      const product = await db.product.findOne({
        where: { name: req.params.productName },
      });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.destroy();
      res.status(200).json({ message: 'Product successfully deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.put(
  '/:productName',
  validateParams(ProductNameParamSchema),
  validateBody(UpdateProductSchema),
  async (req, res) => {
    try {
      const product = await db.product.findOne({
        where: { name: req.params.productName },
      });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const updatedProduct = await product.update(req.body);
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const products = await db.product.findAll({
      include: [
        {
          model: db.productCategory,
          as: 'category',
        },
      ],
    });
    return res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
