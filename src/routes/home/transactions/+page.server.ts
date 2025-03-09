import { transactionSchema } from "./schema";

import { setError, superValidate } from "sveltekit-superforms";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { createTransaction, getTransactions, getUserAccounts } from "$lib/server/prisma/account";

// Die Funktion "load" wird aufgerufen, um die Daten für die Seite zu laden.
export const load: PageServerLoad = async (event) => {
  let accountData = []; // Array, um die Kontodaten zu speichern
  if (event.locals.user) { // Wenn der Benutzer eingeloggt ist
    let accounts = await getUserAccounts(event.locals.user.id); // Holt die Konten des Benutzers

    // Für jedes Konto des Benutzers werden die Transaktionen abgerufen
    for (const account of accounts) {
      let data = {
        id: account.id, // Kontoinformationen
        name: account.name,
        transactions: await getTransactions(account) // Holt die Transaktionen für dieses Konto
      };

      accountData.push(data); // Fügt die Daten des Kontos zum Array hinzu
    }
  }

  // Rückgabe der geladenen Daten, einschließlich des Formulars und der Kontoinformationen
  return {
    form: await superValidate(zod(transactionSchema)), // Formular-Validierung basierend auf dem Schema
    accountData: accountData // Die Kontoinformationen, die später auf der Seite angezeigt werden
  };
};

// Die Aktionen, die ausgeführt werden, wenn das Formular abgesendet wird
export const actions: Actions = {
  // Standardaktion für das Formular
  default: async (event) => {
    const form = await superValidate(event, zod(transactionSchema)); // Validierung des Formulars mit dem Schema
    if (!form.valid) { // Wenn das Formular ungültig ist
      return fail(400, { form }); // Rückgabe des Fehlers mit dem Formular
    }

    // Wenn der Benutzer eingeloggt ist
    if (event.locals.user) {
      try {
        // Versuch, eine neue Transaktion zu erstellen
        await createTransaction(
          form.data.accountId, // Die Kontonummer
          form.data.amount, // Der Betrag der Transaktion
          form.data.type // Der Typ der Transaktion (z.B. "Einzahlung" oder "Abhebung")
        );

        // Erfolgreiche Rückgabe des Formulars mit einem Erfolg-Flag
        return { form, success: true };
      } catch (error) {
        // Fehlerbehandlung, falls beim Erstellen der Transaktion ein Fehler auftritt
        setError(form, "", "Fehler beim Erstellen der Transaktion: " + (error instanceof Error ? error.message : String(error)));
        return fail(500, { form }); // Rückgabe eines 500-Fehlers, wenn ein Problem aufgetreten ist
      }
    } else {
      // Fehler, wenn keine gültige Benutzersitzung vorhanden ist
      setError(form, "", "Ungültige Benutzersitzung");
      return fail(400, { form }); // Rückgabe eines 400-Fehlers, wenn der Benutzer nicht authentifiziert ist
    }
  }
};
