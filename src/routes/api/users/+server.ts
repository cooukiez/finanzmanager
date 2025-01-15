// src/routes/api/users/+server.ts
import { prisma } from '$lib/prisma';

export const GET = async () => {
  const users = await prisma.nutzer.findMany();
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
};
