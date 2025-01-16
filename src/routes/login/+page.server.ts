import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/auth';
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<string, string>
		// change to unique
		const user = await prisma.user.findFirst({
			where: {
				email: email
			}
		})
		if (!user) {
			return fail(400, { message: "Incorrect username or password" })
		}
		const validPassword = await new Argon2id().verify(user.password, password);
		if (!validPassword) {
			return fail(400, { message: "Incorrect username or password" })
		}
		const session = await lucia.createSession(user.id, [])
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})
		redirect(302, "/")
	}
};