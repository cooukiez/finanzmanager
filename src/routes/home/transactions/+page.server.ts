import { transactionSchema } from "./schema";

import { setError, superValidate } from "sveltekit-superforms";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { createTransaction, getTransactions, getUserAccounts } from "$lib/server/prisma/account";

export const load: PageServerLoad = async (event) => {
  const form = await superValidate(zod(transactionSchema));

  let accountData = [];
  if (event.locals.user) {
    let accounts = await getUserAccounts(event.locals.user.id);

    for (const account of accounts) {
      let data = {
        id: account.id,
        name: account.name,
        transactions: await getTransactions(account)
      };

      accountData.push(data);
    }
  }

  return {
    form,
    accountData: accountData
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(transactionSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    if (event.locals.user) {
      try {
        await createTransaction(
          form.data.accountId,
          form.data.amount,
          form.data.type
        );

        // Return the form with a success flag
        return { form, success: true };
      } catch (error) {
        // Handle any errors that might occur during account creation
        setError(form, "", "Failed to create transaction: " + (error instanceof Error ? error.message : String(error)));
        return fail(500, { form });
      }
    } else {
      setError(form, "", "Invalid user session");
      return fail(400, { form });
    }
  }
};