import { z } from "zod";

export type AccountCreateFormSchema = typeof accountCreateFormSchema;

export const accountCreateFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Account name must contain at least 3 characters" })
    .max(40, { message: "Account name must be less than 50 characters" }),
  balance: z
    .number()
    .safe({ message: "Account balance must be a number" })
    .finite({ message: "Account balance must be a number" }),
});
