import { z } from 'zod';

const CreateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

const LoginSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

export { CreateUserSchema, LoginSchema };
