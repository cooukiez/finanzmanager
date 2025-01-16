import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/auth';
import { generateId } from 'lucia';
import { Argon2id } from "oslo/password";
import { redirect } from '@sveltejs/kit';

export const actions = {
		default: async ({ request, cookies }) => {
				const data = await request.formData();
				const { email, password } = Object.fromEntries(data) as Record<string, string>
				const userId = generateId(15)
				const hashedPassword = await new Argon2id().hash(password)
				const user = await prisma.user.create({
						data: {
								id: userId,
								email: email,
								password: hashedPassword
						}
				})
				const session = await lucia.createSession(String(user.id), {});
				const sessionCookie = lucia.createSessionCookie(session.id);
				cookies.set(sessionCookie.name, sessionCookie.value, {
						path: ".",
						...sessionCookie.attributes
				});
				redirect(302, "/");
		}
};