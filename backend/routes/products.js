import dotenv from 'dotenv';
import express from 'express';
import { decodeJWT } from '../middleware/decodeToken.js';
import db from '../models/index.js';
dotenv.config();

import {
  validateBody,
  validateParams,
} from '../middleware/validationMiddleware.js';
import {
  ProductNameParamSchema,
  UpdateProductSchema,
} from '../middleware/validationSchemas/productSchema.js';
const router = express.Router();

router.post('/create', decodeJWT, async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: {
        name: req.body.name,
        productCategoryId: req.body.productCategoryId,
        size: req.body.size,
      },
    });

    if (product) {
      res.status(422).json({
        message:
          'Can not add product, please try with another name, size or category.',
      });
    } else {
      const product = await db.products.create(req.body);
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:productName', async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: {
        name: req.params.productName,
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

router.get('/:productId', async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: {
        name: req.params.productId,
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

router.delete(
  '/:productName',
  validateParams(ProductNameParamSchema),
  async (req, res) => {
    try {
      const product = await db.products.findOne({
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
      const product = await db.products.findOne({
        where: { name: req.params.productName },
      });

      console.log('PRODUCT', product);
      console.log('REQ BODY', req.body);
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
    });
    return res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
