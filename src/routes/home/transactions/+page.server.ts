import { transactionSchema, type TransactionType } from "./schema";

import { superValidate } from "sveltekit-superforms";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";

const exampleTransactions: TransactionType[] = [
  {
    amount: 10,
    type: "dubai croissant"
  },
  {
    amount: 25.50,
    type: "office supplies"
  },
  {
    amount: 125,
    type: "client lunch"
  }
]


export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(transactionSchema));

  const transactions = exampleTransactions;
  return {
    transactions,
    form
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