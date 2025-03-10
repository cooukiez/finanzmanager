import { prisma } from "$lib/server/prisma/user"; // Prisma-Client für Datenbankoperationen
import { generateId } from "lucia"; // Funktion zum Generieren von eindeutigen IDs

// Sucht einen Benutzer anhand seines Namens
export const findUserByName = async (name: string) => {
  return prisma.user.findUnique({
    where: {
      name, // Suche nach Benutzer mit übereinstimmendem Namen
    },
  });
};

// Holt alle Schulden für einen Benutzer (als Schuldner oder Gläubiger)
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

// Erstellt eine neue Schuld zwischen einem Schuldner und Gläubiger
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