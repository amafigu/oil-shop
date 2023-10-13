import { z } from 'zod';

const firstNameValidation = z
  .string()
  .min(2, 'First name should have at least two characters.')
  .max(30, "Can't be longer than 30 characters.")
  .refine((value) => value[0] === value[0].toUpperCase(), {
    message: 'First name should start with a capital letter.',
  })
  .refine((value) => /^[A-Za-z\s]+$/.test(value), {
    message: 'First name can only contain letters.',
  });

const lastNameValidation = z
  .string()
  .min(2, 'Last name should have at least two characters.')
  .max(30, "Can't be longer than 40 characters.")
  .refine((value) => value[0] === value[0].toUpperCase(), {
    message: 'Last name should start with a capital letter.',
  })
  .refine((value) => /^[A-Za-z\s]+$/.test(value), {
    message: 'Last name can only contain letters.',
  });
const emailValidation = z
  .string()
  .min(8, 'Email should have at least 8 characters.')
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
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  password: passwordValidation,
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

const LoginSchema = z.object({
  email: emailValidation,
  password: z.string().optional(),
});

export { CreateUserSchema, LoginSchema };
