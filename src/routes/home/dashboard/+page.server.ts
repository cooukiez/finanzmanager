import type { PageServerLoad } from "./$types";
import {
  expenditureSumSortedByType,
  expenditureSumSortedByTypeForUser,
  getAccountBalance,
  getUserAccounts
} from "$lib/server/prisma/account";
import { getDebtsForUser } from "$lib/server/prisma/debt";

export const load: PageServerLoad = async ({ locals }) => {
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

  if (locals.user) {
    const userId = locals.user.id;

    accountData.expenditures = await expenditureSumSortedByTypeForUser(userId);

    const allDebts = await getDebtsForUser(userId);
    acceptedDebts = allDebts
      .filter(
        (debt) =>
          debt.status === "accepted" &&
          (debt.debtorId === userId || debt.creditorId === userId)
      )
      .map((debt) => ({
        ...debt,
        amount: debt.amount.toNumber(),
      }));
  }

  return {
    user: locals.user || null,
    accountData: accountData.expenditures,
    acceptedDebts,
  };
};

