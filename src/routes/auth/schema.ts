import {z} from "zod";

export type LoginFormSchema = typeof loginFormSchema;

export const loginFormSchema = z.object({
  username: z
      .string()
      .min(3, {message: "Username must contain at least 3 characters"})
      .max(50, {message: "Username must be less than 50 characters"}),
  password: z
      .string()
      .min(3, {message: "Password must contain at least 3 characters"})
      .max(50, {message: "Password must be less than 50 characters"}),
});

export type RegisterFormSchema = typeof registerFormSchema;

export const registerFormSchema = z.object({
  username: z
      .string()
      .min(3, {message: "Username must contain at least 3 characters"})
      .max(50, {message: "Username must be less than 50 characters"}),
  email: z
      .string()
      .email({message: "Invalid email address"})
      .max(50, {message: "Email must be less than 50 characters"}),
  password: z
      .string()
      .min(3, {message: "Password must contain at least 3 characters"})
      .max(50, {message: "Password must be less than 50 characters"}),
});
