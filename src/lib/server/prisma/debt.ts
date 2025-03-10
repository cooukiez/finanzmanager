import { prisma } from "$lib/server/prisma/user"; // Prisma-Client für Datenbankoperationen
import { generateId } from "lucia"; // Funktion zum Generieren von eindeutigen IDs

/**
 * Findet einen Benutzer anhand seines Namens.
 * @param name Der Name des Benutzers.
 * @returns Der gefundene Benutzer oder null, falls nicht vorhanden.
 */
export const findUserByName = async (name: string) => {
  return prisma.user.findUnique({
    where: {
      name, // Suche nach Benutzer mit übereinstimmendem Namen
    },
  });
};

/**
 * Ruft alle Schulden eines Benutzers ab, sowohl als Schuldner als auch als Gläubiger.
 * @param userId Die ID des Benutzers.
 * @returns Eine Liste der zugehörigen Schulden mit Schuldner- und Gläubigerinformationen.
 */
export const getDebtsForUser = async (userId: string) => {
  return prisma.debt.findMany({
    where: {
      OR: [
        // Suche nach Schulden entweder, wenn der Benutzer der Schuldner oder der Gläubiger ist
        { debtorId: userId },
        { creditorId: userId },
      ],
    },
    include: {
      // Enthält zusätzliche Informationen über die Schuldner und Gläubiger
      debtor: true,
      creditor: true,
    },
  });
};

/**
 * Erstellt eine neue Schuld zwischen zwei Benutzern.
 * @param debtorId Die ID des Schuldners.
 * @param creditorId Die ID des Gläubigers.
 * @param amount Der geschuldete Betrag.
 * @param status Der Status der Schuld (z. B. "offen", "beglichen").
 * @param description Beschreibung
 * @returns Die erstellte Schuld.
 */
export const createDebt = async (
  debtorId: string,
  creditorId: string,
  amount: number,
  status: string,
  description: string
) => {
  const debtId = generateId(15); // Generiert eine eindeutige ID für die Schuld
  return prisma.debt.create({
    data: {
      id: debtId,
      debtorId: debtorId,
      creditorId: creditorId,
      amount: amount,
      status: status,
      description: description,
    },
  });
};
