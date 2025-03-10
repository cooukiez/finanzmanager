import { findUserByName, getDebtsForUser, createDebt } from "$lib/server/prisma/debt";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma/user";

export const load: PageServerLoad = async ({ locals }) => {
  // Falls der Benutzer nicht eingeloggt ist, wird er zur Login-Seite weitergeleitet
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  try {
    // Alle Schulden des Benutzers abrufen
    const allDebts = await getDebtsForUser(locals.user!.id);

    // Betrag als Nummer umwandeln, um Serialisierungsprobleme zu vermeiden
    const serializableDebts = allDebts.map((debt) => ({
      ...debt,
      amount: debt.amount.toNumber(),
    }));

    // Schuldanfragen, bei denen der Benutzer der Schuldner ist
    const requestsAsDebtor = serializableDebts.filter(
      (debt) => debt.debtorId === locals.user!.id && debt.status === "pending"
    );
    // Schuldanfragen, bei denen der Benutzer der Gläubiger ist
    const requestsAsCreditor = serializableDebts.filter(
      (debt) => debt.creditorId === locals.user!.id && debt.status === "pending"
    );

    // Akzeptierte Schulden
    const acceptedDebts = serializableDebts.filter(
      (debt) => debt.status === "accepted" &&
        (debt.debtorId === locals.user!.id || debt.creditorId === locals.user!.id)
    );

    // Abgelehnte Schulden, bei denen der Benutzer der Gläubiger ist
    const declinedDebtsAsCreditor = serializableDebts.filter(
      (debt) => debt.status === "declined" && debt.creditorId === locals.user!.id
    ) ?? [];

    return {
      debts: serializableDebts,
      requestsAsDebtor,
      requestsAsCreditor,
      acceptedDebts,
      declinedDebtsAsCreditor,
      user: locals.user,
    };

  } catch (error) {
    return {
      debts: [],
      requestsAsDebtor: [],
      requestsAsCreditor: [],
      acceptedDebts: [],
      user: locals.user || null,
      error: true,
    };
  }
};

export const actions: Actions = {
  createDebt: async ({ request, locals }) => {
    // Prüfen, ob der Benutzer eingeloggt ist
    if (!locals.user) {
      return fail(403, { message: "User not authenticated" });
    }

    const data = await request.formData();
    const username = data.get("username");
    const amount = parseFloat(data.get("amount") as string);
    const description = data.get("description") as string;

    // Überprüfung der Eingabewerte
    if (!username || isNaN(amount) || amount <= 0) {
      return fail(400, { message: "Invalid input values" });
    }

    // Schuldner anhand des Benutzernamens finden
    const debtor = await findUserByName(username as string);

    if (!debtor) {
      return fail(404, { message: "User not found" });
    }

    // Benutzer kann keine Schuld mit sich selbst erstellen
    if (debtor.id === locals.user.id) {
      return fail(400, { message: "You cannot create a debt with yourself" });
    }

    // Neue Schuld erstellen
    await createDebt(debtor.id, locals.user.id, amount, "pending", description);

    return { message: "Debt request sent successfully" };
  },

  // Schuld akzeptieren/ablehnen verarbeiten
  handleRequest: async ({ request, locals }) => {
    const data = await request.formData();
    const debtId = data.get("debtId");
    const action = data.get("action");

    if (!locals.user) {
      return fail(403, { message: "User not authenticated" });
    }

    // Prüfen, ob die Schuld existiert
    const debt = await prisma.debt.findUnique({ where: { id: debtId as string } });

    if (!debt || debt.debtorId !== locals.user.id) {
      return fail(403, { message: "Unauthorized access or invalid debt" });
    }

    // Schuldenstatus aktualisieren
    if (action === "accept") {
      await prisma.debt.update({
        where: { id: debtId as string },
        data: { status: "accepted" },
      });
    } else if (action === "decline") {
      await prisma.debt.update({
        where: { id: debtId as string },
        data: { status: "declined" },
      });
    }

    return { message: "Request handled successfully" };
  },
  // Schuld löschen
  deleteDebt: async ({ request, locals }) => {
    const data = await request.formData();
    const debtId = data.get("debtId");

    if (!debtId) {
      return fail(400, { message: "Debt ID is required" });
    }

    if (!locals.user) {
      return fail(403, { message: "User not authenticated" });
    }

    try {
      // Prüfen, ob die Schuld existiert
      const debt = await prisma.debt.findUnique({
        where: { id: debtId as string },
      });

      if (!debt || debt.creditorId !== locals.user.id ) {
        return fail(403, { message: "Unauthorized access or invalid debt" });
      }

      // Schuld löschen
      await prisma.debt.delete({
        where: { id: debtId as string },
      });
      return { message: "Debt removed successfully" };
    } catch (error) {
      return fail(500, { message: "Failed to delete debt" });
    }
  },
};
