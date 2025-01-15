// src/routes/+page.server.ts
import { prisma } from '$lib/prisma';

export const load = async () => {
  const users = await prisma.nutzer.findMany();
  return {
    users,
  };
};
