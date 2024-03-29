import dotenv from 'dotenv';
import express from 'express';
import { decodeJWT } from '../middleware/decodeToken.js';
import db from '../models/index.js';
dotenv.config();

import { validateBody } from '../middleware/validationMiddleware.js';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '../middleware/validationSchemas/productSchema.js';
const router = express.Router();

router.post(
  '/product/create',
  validateBody(CreateProductSchema),
  decodeJWT,
  async (req, res) => {
    try {
      const existingProduct = await db.products.findOne({
        where: {
          name: req.body.name,
          productCategoryId: req.body.productCategoryId,
          size: req.body.size,
        },
      });

      if (existingProduct) {
        res.status(422).json({
          message:
            'Can not add product, please try with another name, size or category.',
        });
      }
      const NewProduct = await db.products.create(req.body);
      res
        .status(201)
        .json({ message: 'Product created successfully', product: NewProduct });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get('/product/get-by-name/:name', async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: {
        name: req.params.name,
      },
      include: [
        {
          model: db.productCategories,
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
});

router.get('/product/:id', async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.productCategories,
          as: 'category',
        },
      ],
    });
    if (product === null) {
      return res
        .status(404)
        .json({ message: 'Product with this id not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/product/:id', async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(
  '/product/:id',
  validateBody(UpdateProductSchema),
  async (req, res) => {
    try {
      const product = await db.products.findOne({
        where: { id: req.params.id },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.name = req.body.name || product.name;
      product.size = req.body.size || product.size;
      product.price = req.body.price || product.price;
      product.productCategoryId =
        req.body.productCategoryId || product.productCategoryId;
      product.description = req.body.description || product.description;
      product.image = req.body.image || product.image;

      const updatedProduct = await product.update(req.body);
      return res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const products = await db.products.findAll({
      include: [
        {
          model: db.productCategories,
          as: 'category',
        },
      ],
      order: [['id', 'ASC']],
    });
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
