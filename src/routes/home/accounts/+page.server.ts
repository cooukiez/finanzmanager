import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { accountCreateFormSchema } from "./schema";
import {
  createAccountWithInitialBalance,
  getAccountBalance, getTransactions,
  getUserAccounts, income, expenses, createTransaction
} from "$lib/server/prisma/account";

// Server-seitiger Lade-Handler, der die notwendigen Daten für die Seite vorbereitet.
export const load: PageServerLoad = async (event) => {
  let accountData = [];
  // Prüfe, ob ein Benutzer angemeldet ist
  if (event.locals.user) {
    // Hole alle Accounts des Benutzers
    let accounts = await getUserAccounts(event.locals.user.id);
    // Für jeden Account werden Balance, Transaktionen, Einnahmen und Ausgaben ermittelt
    for (const account of accounts) {
      let data = {
        balance: await getAccountBalance(account),
        transactions: await getTransactions(account),
        name: account.name,
        expenses: await expenses(account),
        income: await income(account),
      };
      accountData.push(data);
    }
  }
  // Liefere das validierte Formular und die Account-Daten an die Seite
  return {
    form: await superValidate(zod(accountCreateFormSchema)),
    accountData: accountData,
  };
};

// Aktionen, die auf Formular-Submissions reagieren
export const actions: Actions = {
  default: async (event) => {
    // Validiert die eingereichten Formulardaten anhand des Schemas
    const form = await superValidate(event, zod(accountCreateFormSchema));
    // Falls die Validierung fehlschlägt, wird ein Fehler mit Status 400 zurückgegeben
    if (!form.valid) {
      return fail(400, { form });
    }

    // Prüfe, ob ein Benutzer angemeldet ist
    if (event.locals.user) {
      try {
        // Erstelle einen neuen Account mit dem angegebenen Namen und Startguthaben
        await createAccountWithInitialBalance(
            form.data.name,
            event.locals.user.id,
            form.data.balance
        );

        // Rückgabe des Formulars mit einem Erfolgsflag
        return { form, success: true };
      } catch (error) {
        // Fehlerbehandlung: Setze einen Fehler im Formular und gebe Status 500 zurück
        setError(form, "", "Failed to create account: " + (error instanceof Error ? error.message : String(error)));
        return fail(500, { form });
      }
    } else {
      // Falls keine gültige Benutzersitzung vorliegt, setze einen entsprechenden Fehler
      setError(form, "name", "Invalid user session");
      return fail(400, { form });
    }
  },
};
