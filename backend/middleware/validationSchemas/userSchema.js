import { z } from 'zod';

const nameValidation = z
  .string()
  .min(2, 'Should have at least two characters.')
  .max(30, "Can't be longer than 30 characters.")
  .refine((value) => value[0] === value[0].toUpperCase(), {
    message: 'Fist and Lastname should start with a capital letter.',
  })
  .refine((value) => /^[A-Za-z\s]+$/.test(value), {
    message: 'Can only contain letters.',
  });

const emailValidation = z
  .string()
  .min(8, 'Email should have at least one character.')
  .email('Invalid email format.')
  .max(40, "Email can't be longer than 40 characters.");

const passwordValidation = z
  .string()
  .min(8, 'Password should have at least 8 characters.')
  .refine((value) => /[A-Z]/.test(value), {
    message: 'Password should have at least one uppercase character.',
  })
  .refine((value) => /[!#$%&()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
    message: 'Password should have at least one symbol.',
  });

const CreateUserSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

const LoginSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

export { CreateUserSchema, LoginSchema };
