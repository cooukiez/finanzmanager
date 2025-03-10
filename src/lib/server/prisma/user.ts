import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

export const prisma = new PrismaClient();

// Löscht einen Benutzer basierend auf der ID
export const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

// Aktualisiert Benutzerinformationen
export const updateUser = async (userId: string, name: string, email: string, role: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { name, email, role },
  });
};

// Erstellt einen neuen Benutzer
export const createUser = async (name: string, email: string, role: string, password: string) => {
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);
  return prisma.user.create({
    data: { id: userId, name, email, role, password: hashedPassword },
  });
};

// Prüft, ob ein Benutzer mit Name oder E-Mail existiert
export const checkExistingUser = async (name: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ name }, { email }] },
  });
  return user !== null;
};

// Sucht Benutzer anhand des Namens
export const findUserByName = async (name: string) => {
  return prisma.user.findUnique({
    where: { name },
  });
};

// Aktualisiert Einstellungen eines Benutzers
export const updateUserSettings = async (userId: string, name: string, email: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });
};

// Aktualisiert das Passwort eines Benutzers
export const updateUserPassword = async (userId: string, password: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { password },
  });
};

// Prüft, ob der Benutzername bereits existiert
export const checkExistingUsername = async (name: string) => {
  const user = await prisma.user.findFirst({
    where: { name },
  });
  return user !== null;
};

// Prüft, ob die E-Mail bereits existiert
export const checkExistingEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  return user !== null;
};

// Holt Benutzerinformationen basierend auf der ID
export const getUser = async (userId: string) => {
  return prisma.user.findFirst({
    where: { id: userId },
  });
};