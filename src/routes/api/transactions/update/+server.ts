// src/routes/api/transactions/update/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { updateTransaction } from "$lib/server/prisma/account";

export const PATCH: RequestHandler = async ({ request }) => {
  try {
    // Liest die eingehenden Daten aus der Anfrage
    const data = await request.json();
    const { transactionId, amount, type } = data;

    // Überprüft, ob die Transaktions-ID übermittelt wurde
    if (!transactionId) {
      return json({ error: "Transaction ID is required" }, { status: 400 }); // Fehler: Transaktions-ID fehlt
    }

    // Überprüft, ob der Betrag übermittelt wurde
    if (!amount) {
      return json({ error: "Transaction amount is required" }, { status: 400 }); // Fehler: Betrag fehlt
    }

    // Überprüft, ob der Typ der Transaktion übermittelt wurde
    if (!type) {
      return json({ error: "Transaction type is required" }, { status: 400 }); // Fehler: Transaktionstyp fehlt
    }

    // Aktualisiert die Transaktion in der Datenbank
    const updatedTransaction = updateTransaction(transactionId, amount, type);

    // Gibt die aktualisierte Transaktion zurück
    return json(updatedTransaction);
  } catch (error) {
    // Fehlerbehandlung: Protokolliert den Fehler und gibt eine entsprechende Nachricht zurück
    console.error("Error updating transaction:", error);

    // Gibt eine Fehlermeldung mit den Details des Fehlers zurück
    return json(
      { error: "Failed to update transaction", details: error },
      { status: 500 } // Serverfehler
    );
  }
};
