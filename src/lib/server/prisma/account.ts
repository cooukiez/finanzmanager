import {prisma} from "$lib/server/prisma/user";
import type {Account} from "@prisma/client";
import {generateId} from "lucia";

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

export const getTransactions = async (account: Account) => {
 return prisma.transaction.findMany({
    where: {
      accountId: account.id,
      type: {not: "initial"},
    },
  });
};

export const expenditureSumSortedByType = async (account: Account) => {
  const groupedTransactions = await prisma.transaction.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
    where: {
      accountId: account.id,
      type: {not: "initial"},
      amount: {
        lt: 0,
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

export const income = async (account: Account) => {
  const inc = await prisma.transaction.findMany({
    where: {
      accountId: account.id,
      type: {not: "initial"},
      amount: {
        gt: 0,
      },
    },
  });
  let incAmount = 0;
  inc.forEach((i:any) => {
    incAmount += i.amount;
  });
  return incAmount;
};

export const expenses = async (account: Account) => {
  const ex = await prisma.transaction.findMany({
    where: {
      accountId: account.id,
      type: {not: "initial"},
      amount: {
        lt: 0,
      },
    },
  });
  let exAmount = 0;
  ex.forEach((e:any) => {
    exAmount += e.amount;
  });
  return exAmount;
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

export const createTransaction = async (
  accountId: string,
  amount: number,
  type: string,
) => {
  const transactionId = generateId(15);
  return prisma.transaction.create({
    data: {
      id: transactionId,
      accountId: accountId,
      amount: amount,
      type: type,
    },
  });
};

export const createAccountWithInitialBalance = async (
  name: string,
  userId: string,
  balance: number
) => {
  let account = await createAccount(name, userId);
  await createTransaction(account.id, balance, "initial");
  return account;
};
