import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullName: z.string().min(2).max(120),
    email: z.email(),
    phone: z.string().optional(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    healthConsent: z.boolean().refine((v) => v === true),
    termsAccepted: z.boolean().refine((v) => v === true),
    marketingOptIn: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
