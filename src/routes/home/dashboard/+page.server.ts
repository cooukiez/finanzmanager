import type { PageServerLoad } from "./$types";
import { expenditureSumSortedByTypeForUser } from "$lib/server/prisma/account";
import { getDebtsForUser } from "$lib/server/prisma/debt";

export const load: PageServerLoad = async ({ locals }) => {
  // Standardstruktur für Rückgaben initialisieren
  let accountData: {
    expenditures: { expenditureType: string; expenditureAmount: number }[];
  } = {
    expenditures: []
  };

  let acceptedDebts: {
    debtorId: string;
    creditorId: string;
    status: string;
    amount: number;
  }[] = [];

  // Überprüfen on User eingeloggt ist
  if (locals.user) {
    const userId = locals.user.id;

    // Gesamte Ausgaben des Benutzers nach Typen geordnet abrufen
    accountData.expenditures = await expenditureSumSortedByTypeForUser(userId);

    // Alle Schulden des Benutzers abrufen
    const allDebts = await getDebtsForUser(userId);
    acceptedDebts = allDebts
      // Nur akzeptierte Schulden filtern, die den Benutzer (als Schuldner oder Gläubiger) betreffen
      .filter(
        (debt) =>
          debt.status === "accepted" &&
          (debt.debtorId === userId || debt.creditorId === userId),
      )
      // Betrag von BigInt in eine Zahl umwandeln
      .map((debt) => ({
        ...debt,
        amount: debt.amount.toNumber()
      }));
  }

  // Daten für die Seite zurückgeben
  return {
    user: locals.user || null,
    accountData: accountData.expenditures,
    acceptedDebts
  };
};
