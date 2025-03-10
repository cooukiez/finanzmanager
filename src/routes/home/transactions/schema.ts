import { z } from "zod";

export type TransactionSchema = typeof transactionSchema;
export type TransactionType = z.infer<typeof transactionSchema>;

export const transactionSchema = z.object({
  accountId: z.string(),
  id: z.string(),
  amount: z
    .number()
    .safe({ message: "Transaction amount must be a number" })
    .finite({ message: "Transaction amount must be a number" }),
  type: z
    .string()
    .min(3, { message: "Transaction type must contain at least 3 characters" })
    .max(50, { message: "Transaction type must be less than 50 characters" }),
});
