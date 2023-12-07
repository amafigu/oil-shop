import { z } from 'zod';

const firstAndLastNameValidation = z
  .string()
  .min(2, 'First name should have at least two characters.')
  .max(30, "Can't be longer than 30 characters.")
  .refine((value) => value[0] === value[0].toUpperCase(), {
    message: 'First name should start with a capital letter.',
  })
  .refine((value) => /^[A-Za-z\s]+$/.test(value), {
    message: 'First name can only contain letters.',
  });

const updateUserValidation = z.object({
  irstName: firstAndLastNameValidation
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'First name should start with a capital letter.',
    })
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: 'First name can only contain letters.',
    })
    .optional()
    .default(''),
  lastName: firstAndLastNameValidation
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'Last name should start with a capital letter.',
    })
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: 'Last name can only contain letters.',
    })
    .optional()
    .default(''),
  email: z
    .string()
    .email('Invalid email format.')
    .max(40, "Email can't be longer than 40 characters.")
    .optional()
    .default(''),
});
const createUserValidation = z.object({
  firstName: firstAndLastNameValidation
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'First name should start with a capital letter.',
    })
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: 'First name can only contain letters.',
    }),
  lastName: firstAndLastNameValidation
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'Last name should start with a capital letter.',
    })
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: 'Last name can only contain letters.',
    }),
  email: z
    .string()
    .min(4, 'Email should have at least 4 characters.')
    .email('Invalid email format. ')
    .max(40, "Email can't be longer than 40 characters."),
  password: z
    .string()
    .min(8, 'Password should have at least 8 characters.')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password should have at least one uppercase character.',
    })
    .refine((value) => /[!#$%&()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
      message: 'Password should have at least one symbol.',
    }),
  image: z.string().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

const createGuestUserValidation = z.object({
  firstName: firstAndLastNameValidation
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'First name should start with a capital letter.',
    })
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: 'First name can only contain letters.',
    }),
  lastName: firstAndLastNameValidation
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'Last name should start with a capital letter.',
    })
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: 'Last name can only contain letters.',
    }),
  email: z.string(),

  password: z.string(),

  image: z.string().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

const shippingDataValidation = z.object({
  street: z
    .string()
    .max(60, "Can't be longer than 60 characters.")
    .optional()
    .default(''),
  number: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(''),
  details: z.string().max(60, "Can't be longer than 50 characters.").optional(),
  postalCode: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(''),
  city: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(''),
  state: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(''),
});

const loginValidation = z.object({
  email: z
    .string()
    .min(4, 'Email should have at least 4 characters.')
    .email('Invalid email format. ')
    .max(40, "Email can't be longer than 40 characters."),
  password: z.string().optional(),
});

export {
  createGuestUserValidation,
  createUserValidation,
  loginValidation,
  shippingDataValidation,
  updateUserValidation,
};
