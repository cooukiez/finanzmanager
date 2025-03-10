import { prisma } from "$lib/server/prisma/user";
import type { Account } from "@prisma/client";
import { generateId } from "lucia";

/**
 * Holt alle Konten eines Benutzers aus der Datenbank.
 * @param userId Die ID des Benutzers.
 * @returns Eine Liste der Benutzerkonten.
 */
export const getUserAccounts = async (userId: string) => {
  return prisma.account.findMany({
    where: {
      ownerId: userId,
    },
  });
};

/**
 * Berechnet den aktuellen Kontostand eines Kontos.
 * @param account Das Konto.
 * @returns Der Kontostand.
 */
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

/**
 * Holt alle Transaktionen eines Kontos, außer der initialen Transaktion.
 * @param account Das Konto.
 * @returns Eine Liste der Transaktionen.
 */
export const getTransactions = async (account: Account) => {
  return prisma.transaction.findMany({
    where: {
      accountId: account.id,
      type: {not: "initial"},
    },
  });
};

/**
 * Summiert die Ausgaben eines Kontos, gruppiert nach Typ und sortiert sie aufsteigend.
 * @param account Das Konto.
 * @returns Eine Liste mit den Ausgaben nach Typ.
 */
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

/**
 * Summiert die Ausgaben eines Benutzers über alle Konten, gruppiert nach Typ.
 * @param userId Die ID des Benutzers.
 * @returns Eine Liste der Ausgaben nach Typ.
 */
export const expenditureSumSortedByTypeForUser = async (userId: string) => {
  const userAccounts = await getUserAccounts(userId);
  const accountIds = userAccounts.map(account => account.id);

  const groupedTransactions = await prisma.transaction.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
    where: {
      accountId: {
        in: accountIds
      },
      type: { not: "initial" },
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

/**
 * Berechnet das Einkommen eines Kontos.
 * @param account Das Konto.
 * @returns Die gesamte Einnahmesumme.
 */
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

/**
 * Berechnet die Ausgaben eines Kontos.
 * @param account Das Konto.
 * @returns Die gesamte Ausgabensumme.
 */
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

/**
 * Erstellt ein neues Konto für einen Benutzer.
 * @param name Der Name des Kontos.
 * @param userId Die ID des Benutzers.
 * @returns Das erstellte Konto.
 */
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

/**
 * Erstellt eine neue Transaktion für ein Konto.
 * @param accountId Die ID des Kontos.
 * @param amount Der Betrag der Transaktion.
 * @param type Der Typ der Transaktion.
 * @returns Die erstellte Transaktion.
 */
export const createTransaction = async (
  accountId: string,
  amount: Exclude<number, 0>,
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

/**
 * Aktualisiert eine bestehende Transaktion.
 * @param transactionId Die ID der Transaktion.
 * @param amount Der neue Betrag.
 * @param type Der neue Typ.
 * @returns Die aktualisierte Transaktion.
 */
export const updateTransaction = async (
  transactionId: string,
  amount: Exclude<number, 0>,
  type: string
) => {
  return prisma.transaction.update({
    data: {
      amount: amount,
      type: type
    },
    where: {
      id: transactionId
    }
  });
};

/**
 * Aktualisiert ein einzelnes Feld einer Transaktion.
 * @param transactionId Die ID der Transaktion.
 * @param fieldName Der Name des Feldes.
 * @param value Der neue Wert.
 */
export const updateTransactionField = async (
  transactionId: string,
  fieldName: string,
  value: any
) => {
  return prisma.transaction.update({
    data: {
      [fieldName]: value
    },
    where: {
      id: transactionId
    }
  });
};

/**
 * Erstellt ein Konto mit einem Startguthaben.
 * @param name Der Name des Kontos.
 * @param userId Die ID des Benutzers.
 * @param balance Das Startguthaben.
 * @returns Das erstellte Konto.
 */
export const createAccountWithInitialBalance = async (
  name: string,
  userId: string,
  balance: number
) => {
  let account = await createAccount(name, userId);
  await createTransaction(account.id, balance, "initial");
  return account;
};
