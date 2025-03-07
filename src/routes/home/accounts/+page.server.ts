import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { accountCreateFormSchema } from "./schema";
import {
  createAccountWithInitialBalance,
  expenditureSumSortedByType, getAccountBalance, getTransactions,
  getUserAccounts, incomeSumSortedByType
} from "$lib/server/prisma/account";

export const load: PageServerLoad = async (event) => {
  let accountData = [];
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id);

    for (const account of accounts) {
      const transactions = await getTransactions(account);
      let data = {
        balance: await getAccountBalance(account),
        transactions: transactions,
        name: account.name,
        expenses: await expenditureSumSortedByType(account),
        income: await incomeSumSortedByType(account),
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
      try {
        await createAccountWithInitialBalance(
          form.data.name,
          event.locals.user.id,
          form.data.balance
        );

        // Return the form with a success flag
        return { form, success: true };
      } catch (error) {
        // Handle any errors that might occur during account creation
        setError(form, "", "Failed to create account: " + (error instanceof Error ? error.message : String(error)));
        return fail(500, { form });
      }
    } else {
      setError(form, "name", "Invalid user session");
      return fail(400, { form });
    }
  },
};