import {prisma} from "$lib/server/prisma/user";
import type {Account} from "@prisma/client";

export const getAccountBalance = async (account: Account) => {
	return prisma.transaction.findMany({
		where: {
			accountId: account.id,
		}
	})
};