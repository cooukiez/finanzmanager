import type { PageServerLoad } from "./$types";
import { expenditureSumSortedByType, getAccountBalance, getUserAccounts } from "$lib/server/prisma/account";

export const load: PageServerLoad = async (event) => {
  let accountData = [];
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id);

    for (const account of accounts) {
      let data = {
        expenditures: await expenditureSumSortedByType(account),
        balance: await getAccountBalance(account),
        name: account.name,
      };

      accountData.push(data);
    }
  }

  return {
    accountData: accountData
  };
};
