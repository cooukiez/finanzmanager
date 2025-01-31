import { prisma } from "$lib/server/prisma/user";
import type { Account } from "@prisma/client";
import { generateId } from "lucia";

export const getUserAccounts = async (userId: string) => {
  return prisma.account.findMany({
    where: {
      ownerId: userId,
    },
  });
};

export const getAccountBalance = async (account: Account) => {
  let result = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      accountId: account.id,
    },
  });

  return result._sum.amount || 0;
};

export const expenditureSumSortedByType = async (account: Account) => {
  const groupedTransactions = await prisma.transaction.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
    where: {
      accountId: account.id,
      amount: {
        lt: 0, // filter for negative amounts (expenditures)
      },
    },
    orderBy: {
      _sum: {
        amount: "asc",
      },
    },
  });

  return groupedTransactions.map((group) => ({
    expenditureType: group.type,
    expenditureAmount: Math.abs(group._sum.amount ?? 0),
  }));
};

export const createAccount = async (name: string, userId: string) => {
  const accountId = generateId(15);
  return prisma.account.create({
    data: {
      id: accountId,
      name: name,
      ownerId: userId,
    },
  });
};

export const createTransaction = async (accountId: string, amount: number, type: string) => {
  const transactionId = generateId(15);
  return prisma.transaction.create({
    data: {
      id: transactionId,
      accountId: accountId,
      amount: amount,
      type: type,
    },
  })
}

export const createAccountWithInitialBalance = async (name: string, userId: string, balance: number) => {
  let account = await createAccount(name, userId);
  await createTransaction(account.id, balance, "initial");
  return account;
};
