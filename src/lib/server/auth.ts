// src/lib/auth.ts
import {prisma} from "$lib/server/prisma/user";

import {Lucia} from "lucia";
import {PrismaAdapter} from "@lucia-auth/adapter-prisma";

import {dev} from "$app/environment";
import type {Account} from "@prisma/client";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			name: attributes.name,
			role: attributes.role,
			accounts: attributes.accounts
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	email: string;
	name: string;
	role: string;
	accounts: Account[];
}