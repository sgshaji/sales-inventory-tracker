
import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(255, 'Email must not exceed 255 characters');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must not exceed 72 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters'),
  shopName: z.string().min(2, 'Shop name must be at least 2 characters').max(100, 'Shop name must not exceed 100 characters'),
  currency: z.string().length(3, 'Currency must be a 3-letter code'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export const signUpSchema = signupSchema;
export type SignupFormValues = z.infer<typeof signupSchema>;
