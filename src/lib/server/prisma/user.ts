import { PrismaClient } from "@prisma/client";
import "dotenv/config";

import { generateId } from "lucia";
import { Argon2id } from "oslo/password";


export const prisma = new PrismaClient();

export const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (
  userId: string,
  name: string,
  email: string,
  role: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      email: email,
      role: role,
    },
  });
};

export const createUser = async (
  name: string,
  email: string,
  role: string,
  password: string
) => {
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);
  return prisma.user.create({
    data: {
      id: userId,
      name: name,
      email: email,
      role: role,
      password: hashedPassword,
    },
  });
};

export const checkExistingUser = async (name: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ name: name }, { email: email }]
    },
  });
  return user !== null;
};

export const findUserByName = async (name: string) => {
  return prisma.user.findUnique({
    where: {
      name: name,
    },
  });
};

export const updateUserSettings = async (
  userId: string,
  name: string,
  email: string,
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      email: email,
    },
  });
};

export const updateUserPassword = async (
  userId: string,
  password: string,
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
};


export const checkExistingUsername = async (name: string) => {
  const user = await prisma.user.findFirst({
    where: {
      name: name
    },
  });
  return user !== null;
};

export const checkExistingEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    },
  });
  return user !== null;
};

export const getUser = async (userId: string) => {
  return prisma.user.findFirst({
    where: {
      id: userId,
    }
  })
}

