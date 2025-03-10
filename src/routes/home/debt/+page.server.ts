import { findUserByName, getDebtsForUser, createDebt } from "$lib/server/prisma/debt";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma/user";

export const load: PageServerLoad = async ({ locals }) => {

  if (!locals.user) {
    throw redirect(302, "/login");
  }

  try {
    const allDebts = await getDebtsForUser(locals.user!.id);

    const serializableDebts = allDebts.map((debt) => ({
      ...debt,
      amount: debt.amount.toNumber(),
    }));

    // Filter debts based on status
    const requestsAsDebtor = serializableDebts.filter(
      (debt) => debt.debtorId === locals.user!.id && debt.status === "pending"
    );
    const requestsAsCreditor = serializableDebts.filter(
      (debt) => debt.creditorId === locals.user!.id && debt.status === "pending"
    );

    const acceptedDebts = serializableDebts.filter(
      (debt) => debt.status === "accepted" &&
        (debt.debtorId === locals.user!.id || debt.creditorId === locals.user!.id)
    );

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

    if (!locals.user) {
      console.log("User not authenticated");
      return fail(403, { message: "User not authenticated" });
    }

    const data = await request.formData();
    const username = data.get("username");
    const amount = parseFloat(data.get("amount") as string);

    if (!username || isNaN(amount) || amount <= 0) {
      console.log("Invalid input values");
      return fail(400, { message: "Invalid input values" });
    }

    const debtor = await findUserByName(username as string);

    if (!debtor) {
      console.log("Debtor not found");
      return fail(404, { message: "User not found" });
    }

    if (debtor.id === locals.user.id) {
      console.log("Cannot create debt with yourself");
      return fail(400, { message: "You cannot create a debt with yourself" });
    }

    await createDebt(debtor.id, locals.user.id, amount, "pending");

    return { message: "Debt request sent successfully" };
  },

  handleRequest: async ({ request, locals }) => {
    const data = await request.formData();
    const debtId = data.get("debtId");
    const action = data.get("action");

    if (!locals.user) {
      return fail(403, { message: "User not authenticated" });
    }

    const debt = await prisma.debt.findUnique({ where: { id: debtId as string } });

    if (!debt || debt.debtorId !== locals.user.id) {
      return fail(403, { message: "Unauthorized access or invalid debt" });
    }

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

  deleteDebt: async ({ request, locals }) => {
    const data = await request.formData();
    const debtId = data.get("debtId");
    console.log("deleteDebt triggered")
    console.log(debtId)

    if (!debtId) {
      return fail(400, { message: "Debt ID is required" });
    }

    if (!locals.user) {
      return fail(403, { message: "User not authenticated" });
    }

    try {
      const debt = await prisma.debt.findUnique({
        where: { id: debtId as string },
      });

      if (!debt || debt.creditorId !== locals.user.id ) {
        return fail(403, { message: "Unauthorized access or invalid debt" });
      }

      await prisma.debt.delete({
        where: { id: debtId as string },
      });

      return { message: "Debt removed successfully" };
    } catch (error) {
      console.log("Error deleting debt:", error);
      return fail(500, { message: "Failed to delete debt" });
    }
  },
};