import { writable } from "svelte/store";

export const cellEditStore = writable<{ transactionId: string, fieldName: string, value: any } | null>(null);

// Abonnieren des cellEditStore, um auf Zellbearbeitungen zu reagieren
const unsubscribe = cellEditStore.subscribe((editData) => {
  if (editData) {
    // noinspection JSIgnoredPromiseFromCall
    updateTransactionInDatabase(editData); // Bearbeitet die Zelländerung
  }
});

// Funktion, um die Transaktion in der Datenbank zu aktualisieren
async function updateTransactionInDatabase(editData: { transactionId: string, fieldName: string, value: any }) {
  try {
    const { transactionId, fieldName, value } = editData;

    const response = await fetch("/api/transactions/update_field", {
      method: "PATCH", // PATCH-Methode zum Aktualisieren
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transactionId,
        fieldName,
        value
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Fehler beim Aktualisieren der Transaktion:", errorData);
      return;
    }

    // Antwort wird nicht benötigt, aber trotzdem verarbeitet
    await response.json();
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Transaktion:", error);
  }
}