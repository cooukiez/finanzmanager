import { prisma } from "$lib/server/prisma/user";
import { generateId } from "lucia";

export const findUserByName = async (name: string) => {
  return prisma.user.findUnique({
    where: {
      name,
    },
  });
};

export const getDebtsForUser = async (userId: string) => {
  return prisma.debt.findMany({
    where: {
      OR: [
        { debtorId: userId },
        { creditorId: userId },
      ],
    },
    include: {
      debtor: true,
      creditor: true,
    },
  });
};

export const createDebt = async (
  debtorId: string,
  creditorId: string,
  amount: number,
  status: string
) => {
  const debtId = generateId(15);
  return prisma.debt.create({
    data: {
      id: debtId,
      debtorId: debtorId,
      creditorId: creditorId,
      amount: amount,
      status: status,
    },
  });
};