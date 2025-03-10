// src/routes/api/transactions/update/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { updateTransactionField } from "$lib/server/prisma/account";

export const PATCH: RequestHandler = async ({ request }) => {
  try {
    // Liest die eingehenden Daten aus der Anfrage
    const data = await request.json();
    const { transactionId, fieldName, value } = data;

    console.log(data);

    // Überprüfe, ob alle Daten korrekt übermittelt
    if (!transactionId) {
      return json({ error: "Transaction ID is required" }, { status: 400 });
    }

    if (!fieldName) {
      return json({ error: "Field name is required" }, { status: 400 });
    }

    if (!value) {
      return json({ error: "Value is required" }, { status: 400 });
    }

    // Aktualisiert die Transaktion in der Datenbank
    const updatedTransaction = updateTransactionField(
      transactionId,
      fieldName,
      value
    );

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
