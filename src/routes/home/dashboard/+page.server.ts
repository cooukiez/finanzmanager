import type { PageServerLoad } from "./$types";
import { expenditureSumSortedByType, getAccountBalance, getUserAccounts } from "$lib/server/prisma/account";
import { getDebtsForUser } from "$lib/server/prisma/debt";

export const load: PageServerLoad = async ({ locals }) => {
  let accountData: {
    expenditures: { expenditureType: string; expenditureAmount: number }[];
    balance: number;
    name: string;
  }[] = [];

  let acceptedDebts: {
    debtorId: string;
    creditorId: string;
    status: string;
    amount: number;
  }[] = [];

  if (locals.user) {
    const userId = locals.user.id;

    const accounts = await getUserAccounts(userId);
    for (const account of accounts) {
      accountData.push({
        expenditures: await expenditureSumSortedByType(account),
        balance: await getAccountBalance(account),
        name: account.name,
      });
    }

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
    accountData,
    acceptedDebts,
  };
};

