import type { IndexedRoute } from "$lib";
import { userAccounts, userDebt, userHomepage, userTransactions } from "$lib/config/routes";

export const userRoutes: IndexedRoute[] = [
  {
    name: "Home",
    href: userHomepage,
    label: "",
    index: 0,
  },
  {
    name: "Accounts",
    href: userAccounts,
    label: "",
    index: 1
  },
  {
    name: "Debt",
    href: userDebt,
    label: "",
    index: 2
  },
  {
    name: "Transactions",
    href: userTransactions,
    label: "",
    index: 3
  },
];
