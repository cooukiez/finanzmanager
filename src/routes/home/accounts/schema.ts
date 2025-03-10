import { z } from "zod";

// Exportiert den Typ basierend auf dem definierten Schema
export type AccountCreateFormSchema = typeof accountCreateFormSchema;

// Schema zur Validierung des Account-Erstellungsformulars
export const accountCreateFormSchema = z.object({
  // Validierung für den Accountnamen: muss ein String mit 3 bis 40 Zeichen sein
  name: z
    .string()
    .min(3, { message: "Account name must contain at least 3 characters" })
    .max(40, { message: "Account name must be less than 40 characters" }),
  // Validierung für das Anfangsguthaben: muss eine gültige, endliche Zahl sein
  balance: z
    .number()
    .safe({ message: "Account balance must be a number" })
    .finite({ message: "Account balance must be a number" }),
});
