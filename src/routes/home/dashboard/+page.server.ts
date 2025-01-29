import type {PageServerLoad} from "./$types";
import {
  expenditureSumSortedByType,
  getUserAccounts,
} from "$lib/server/prisma/account";

export const load: PageServerLoad = async (event) => {
  let accountData = [];
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id);

    for (const account of accounts) {
      accountData.push(await expenditureSumSortedByType(account));
    }
  }

  return {
    accountData: accountData,
  };
};
