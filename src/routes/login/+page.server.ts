import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/auth';

import { Argon2id } from "oslo/password";

import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	// if session exists, redirect to root page
	if (event.locals.user) {
		return redirect(302, "/");
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<string, string>

		// find user in database
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		// check if user exists
		if (!user) {
			return fail(400, { message: "Incorrect username or password" })
		}

		// check password
		const validPassword = await new Argon2id().verify(user.password, password);
		if (!validPassword) {
			return fail(400, { message: "Incorrect username or password" })
		}

		// create session
		const session = await lucia.createSession(user.id, [])
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})

		// redirect to root page
		redirect(302, "/")
	}
};