import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  measure: z.string(),
  size: z.number().int(),
  category: z.string(),
  details: z.string(),
  price: z.number(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

const UpdateProductSchema = z.object({
  name: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  measure: z.string().optional(),
  size: z.number().int().optional(),
  category: z.string().optional(),
  details: z.string().optional(),
  price: z.number().optional(),
});

const ProductNameParamSchema = z.object({
  productName: z.string(),
});

export { CreateProductSchema, ProductNameParamSchema, UpdateProductSchema };
