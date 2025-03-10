// src/lib/auth.ts
import { prisma } from "$lib/server/prisma/user";
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import type { Account } from "@prisma/client";

// Adapter für Prisma in Verbindung mit Lucia
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Konfiguration von Lucia für Authentifizierung
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev, // Cookies sind in der Entwicklung unsicher und in Produktion sicher
    },
  },
  // Definition der benutzerdefinierten Benutzerattribute
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: attributes.name,
      role: attributes.role,
      accounts: attributes.accounts,
    };
  },
});

// Typdefinitionen für Lucia
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// Beschreibung der Benutzerattribute in der Datenbank
interface DatabaseUserAttributes {
  email: string;
  name: string;
  role: string;
  accounts: Account[];
}
