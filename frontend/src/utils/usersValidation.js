import { z } from "zod"

const createGuestFirstNameValidation = z
  .string()
  .min(1, "First name should have at least two characters.")
  .max(30, "First name can't be longer than 30 characters.")
  .refine((value) => value[0] === value[0].toUpperCase(), {
    message: "First name should start with a capital letter.",
  })
  .refine((value) => /^[A-Za-z\s]+$/.test(value), {
    message: "First name can only contain letters.",
  })

const createGuestLastNameValidation = z
  .string()
  .min(1, "Last name should have at least two characters.")
  .max(30, "Last name can't be longer than 30 characters.")
  .refine((value) => value[0] === value[0].toUpperCase(), {
    message: "Last name should start with a capital letter.",
  })
  .refine((value) => /^[A-Za-z\s]+$/.test(value), {
    message: "Last name can only contain letters.",
  })

const firstNameUpdateValidation = z
  .string()
  .max(30, "First name can't be longer than 30 characters.")
  .refine((value) => value.length === 0 || value.length >= 2, {
    message: "First name should have at least two characters.",
  })
  .refine((value) => value === "" || value[0] === value[0].toUpperCase(), {
    message: "First name should start with a capital letter.",
  })
  .refine((value) => value === "" || /^[A-Za-z\s]+$/.test(value), {
    message: "First name can only contain letters.",
  })
  .optional()
  .default("")

const lastNameUpdateValidation = z
  .string()
  .max(30, "Last name can't be longer than 30 characters.")
  .refine((value) => value.length === 0 || value.length >= 2, {
    message: "Last name should have at least two characters.",
  })
  .refine((value) => value === "" || value[0] === value[0].toUpperCase(), {
    message: "Last name should start with a capital letter.",
  })
  .refine((value) => value === "" || /^[A-Za-z\s]+$/.test(value), {
    message: "Last name can only contain letters.",
  })
  .optional()
  .default("")

const firstNameCreateUserValidation = z
  .string()
  .max(30, "First name can't be longer than 30 characters.")
  .refine((value) => value.length === 0 || value.length >= 2, {
    message: "First name should have at least two characters.",
  })
  .refine((value) => value === "" || value[0] === value[0].toUpperCase(), {
    message: "First name should start with a capital letter.",
  })
  .refine((value) => value === "" || /^[A-Za-z\s]+$/.test(value), {
    message: "First name can only contain letters.",
  })

const lastNameCreateUserValidation = z
  .string()
  .max(30, "Last name can't be longer than 30 characters.")
  .refine((value) => value.length === 0 || value.length >= 2, {
    message: "Last name should have at least two characters.",
  })
  .refine((value) => value === "" || value[0] === value[0].toUpperCase(), {
    message: "Last name should start with a capital letter.",
  })
  .refine((value) => value === "" || /^[A-Za-z\s]+$/.test(value), {
    message: "Last name can only contain letters.",
  })

const updateUserSchema = z.object({
  firstName: firstNameUpdateValidation,
  lastName: lastNameUpdateValidation,
  image: z.string().optional(),
  email: z
    .string()
    .max(50, "Email can't be longer than 50 characters.")
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Invalid email format.",
      },
    )
    .optional()
    .default(""),
})

const createUserSchema = z.object({
  firstName: firstNameCreateUserValidation,
  lastName: lastNameCreateUserValidation,
  email: z
    .string()
    .min(4, "Invalid email format. ")
    .email("Invalid email format.")
    .max(40, "Email can't be longer than 40 characters."),
  password: z
    .string()
    .min(8, "Password should have at least 8 characters.")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password should have at least one uppercase character.",
    })
    .refine((value) => /[!#$%&()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
      message: "Password should have at least one symbol.",
    }),
  image: z.string().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
})

const createGuestUserSchema = z.object({
  firstName: createGuestFirstNameValidation,
  lastName: createGuestLastNameValidation,
  email: z.string(),
  password: z.string(),
  image: z.string().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
})

const shippingDataSchema = z.object({
  street: z
    .string()
    .max(60, "Can't be longer than 60 characters.")
    .optional()
    .default(""),
  number: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(""),
  details: z.string().max(60, "Can't be longer than 50 characters.").optional(),
  postalCode: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(""),
  city: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(""),
  state: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(""),
  country: z
    .string()
    .max(30, "Can't be longer than 30 characters.")
    .optional()
    .default(""),
})

const loginValidation = z.object({
  email: z
    .string()
    .min(4, "Email should have at least 4 characters.")
    .max(40, "Email can't be longer than 40 characters."),
  password: z.string().optional(),
})

export {
  createGuestUserSchema,
  createUserSchema,
  loginValidation,
  shippingDataSchema,
  updateUserSchema,
}
