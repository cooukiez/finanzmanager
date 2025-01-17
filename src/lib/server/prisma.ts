// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

export const prisma = new PrismaClient();

export const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (userId: string, name: string) => {
	return prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			name,
		},
	});
}