import { transactionSchema } from "./schema";

import { setError, superValidate } from "sveltekit-superforms";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { createTransaction, getTransactions, getUserAccounts } from "$lib/server/prisma/account";

// Die Funktion "load" wird aufgerufen, um die Daten für die Seite zu laden.
export const load: PageServerLoad = async (event) => {
  let accountData = []; // Array, um die Kontodaten zu speichern

  // Wenn der Benutzer eingeloggt ist
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id); // Holt die Konten des Benutzers

    for (const account of accounts) {
      let data = {
        id: account.id,
        name: account.name,
        transactions: await getTransactions(account) // Holt die Transaktionen für dieses Konto
      };

      accountData.push(data);
    }
  }

  // Rückgabe der geladenen Daten, einschließlich des Formulars und der Kontoinformationen
  return {
    form: await superValidate(zod(transactionSchema)),
    accountData: accountData
  };
};

// Die Aktionen, die ausgeführt werden, wenn das Formular abgesendet wird
export const actions: Actions = {
  // Standardaktion für das Formular
  default: async (event) => {
    // Validierung des Formulars mit dem Schema
    const form = await superValidate(event, zod(transactionSchema));
    if (!form.valid) {
      return fail(400, { form }); // Rückgabe des Fehlers mit dem Formular
    }

    // Wenn der Benutzer eingeloggt ist
    if (event.locals.user) {
      try {
        // Versuch, eine neue Transaktion zu erstellen
        await createTransaction(
          form.data.accountId,
          form.data.amount,
          form.data.type
        );

        // Erfolgreiche Rückgabe des Formulars mit einem Erfolg-Flag
        return { form, success: true };
      } catch (error) {
        // Fehlerbehandlung, falls beim Erstellen der Transaktion ein Fehler auftritt
        setError(form, "", "Fehler beim Erstellen der Transaktion: " + (error instanceof Error ? error.message : String(error)));
        return fail(500, { form });
      }
    } else {
      // Fehler, wenn keine gültige Benutzersitzung vorhanden ist
      setError(form, "", "Ungültige Benutzersitzung");
      return fail(400, { form });
    }
  }
};
