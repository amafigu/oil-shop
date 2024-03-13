import { z } from "zod"

const createProductSchema = z.object({
  name: z.string().refine((value) => value.length <= 30, {
    message: "Product name can't be longer than 30 characters.",
  }),
  image: z.string(),
  description: z.string().refine((value) => value.length <= 50, {
    message: "Product description can't be longer than 50 characters.",
  }),
  measure: z.string(),
  size: z
    .number()
    .int()
    .refine((value) => value <= 100000, {
      message: "Product size can't be more than 100000.",
    }),
  productCategoryId: z.number().int(),
  details: z.string().refine((value) => value.length <= 200, {
    message: "Product details can't be longer than 200 characters.",
  }),
  price: z.number().refine((value) => value <= 100000, {
    message: "Product price can't be more than 100000.",
  }),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
})

const updateProductSchema = z.object({
  price: z
    .number()
    .refine((value) => value <= 100000, {
      message: "Product price can't be more than 100000.",
    })
    .optional(),
  name: z
    .string()
    .refine((value) => value.length <= 30, {
      message: "Product name can't be longer than 30 characters.",
    })
    .optional(),
  image: z.string().optional(),
  description: z
    .string()
    .refine((value) => value.length <= 20, {
      message: "Product description can't be longer than 20 characters.",
    })
    .optional(),
  measure: z.string().optional(),
  size: z
    .number()
    .refine((value) => value <= 100000, {
      message: "Product size can't be more than 100000.",
    })
    .optional(),
  category: z.string().optional(),
  details: z
    .string()
    .refine((value) => value.length <= 200, {
      message: "Product details can't be longer than 200 characters.",
    })
    .optional(),
})

const ProductCategorySchema = z.object({
  name: z.string().refine((value) => value.length <= 30, {
    message: "Product category can't be longer than 30 characters.",
  }),
})

export { ProductCategorySchema, createProductSchema, updateProductSchema }
