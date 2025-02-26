import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { accountCreateFormSchema } from "./schema";
import {
  createAccountWithInitialBalance,
  expenditureSumSortedByType, getAccountBalance, getTransactions,
  getUserAccounts
} from "$lib/server/prisma/account";

export const load: PageServerLoad = async (event) => {
  let accountData = [];
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id);

    for (const account of accounts) {
      let data = {
        balance: await getAccountBalance(account),
        transactions: await getTransactions(account)
      };
      accountData.push(data);
    }
  }
  return {
    form: await superValidate(zod(accountCreateFormSchema)),
    accountData: accountData,
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(accountCreateFormSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    if (event.locals.user) {
      await createAccountWithInitialBalance(
        form.data.name,
        event.locals.user.id,
        form.data.balance
      );
    } else {
      setError(form, "name", "Invalid user session");
      return fail(400, { form });
    }
  },
};
