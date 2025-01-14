// src/routes/+page.server.ts
import { prisma } from '$lib/prisma'; // adjust path as necessary

export const load = async () => {
  const users = await prisma.nutzer.findMany(); // Load all users from the 'nutzer' model
  return {
    users,
  };
};
