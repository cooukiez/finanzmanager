import { type TransactionType } from "./schema";
import type { PageServerLoad } from "./$types.js";


const exampleTransactions: TransactionType[] = [
  {
    amount: 10,
    type: "dubai croissant"
  },
]

export const load: PageServerLoad = async () => {
  const transactions = exampleTransactions;
  return {
    transactions
  };
};
