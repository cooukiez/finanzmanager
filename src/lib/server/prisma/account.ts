import {prisma} from "$lib/server/prisma/user";
import type {Account, User} from "@prisma/client";
import {generateId} from "lucia";
import {Argon2id} from "oslo/password";

export const getUserAccounts = async (userId: string) => {
    return prisma.account.findMany({
        where: {
            ownerId: userId,
        }
    })
};

export const getAccountBalance = async (account: Account) => {
    let result = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            accountId: account.id,
        }
    })

    return result._sum.amount || 0;
};

export const expenditureSumSortedByType = async (account: Account) => {
    const groupedTransactions = await prisma.transaction.groupBy({
        by: ['type'],
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
                amount: 'asc',
            },
        },
    });

    return groupedTransactions.map(group => ({
        expenditureType: group.type,
        expenditureAmount: Math.abs(group._sum.amount ?? 0),
    }));
}

export const createAccount = async (name: string, userId: string) => {
    const accountId = generateId(15)
    return prisma.account.create({
        data: {
            id: accountId,
            name: name,
            ownerId: userId,
        },
    });
}
