import { transactionSchema } from "./schema";

import { superValidate } from "sveltekit-superforms";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { expenses, getAccountBalance, getTransactions, getUserAccounts, income } from "$lib/server/prisma/account";
import { accountCreateFormSchema } from "../accounts/schema";

export const load: PageServerLoad = async (event) => {
  const form = await superValidate(zod(transactionSchema));

  let accountData = [];
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id);

    for (const account of accounts) {
      let data = {
        balance: await getAccountBalance(account),
        transactions: await getTransactions(account),
        name: account.name,
        expenses: await expenses(account),
        income: await income(account)
      };

      accountData.push(data);
    }
  }

  return {
    form: await superValidate(zod(accountCreateFormSchema)),
    accountData: accountData
  };
};

export const actions: Actions = {
  updateTransaction: async ({ request }) => {
    const form = await superValidate(request, zod(transactionSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // In a real app, you would update the transaction in the database here
    // For this demo, we'll just return success
    return { form };
  },

  addTransaction: async ({ request }) => {
    const form = await superValidate(request, zod(transactionSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // In a real app, you would add the transaction to the database here
    // For this demo, we'll just return success
    return { form };
  }
};