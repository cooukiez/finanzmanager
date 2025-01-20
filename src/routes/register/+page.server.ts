import {prisma} from '$lib/server/prisma';
import {lucia} from '$lib/server/auth';

import {generateId} from 'lucia';
import {Argon2id} from "oslo/password";

import {fail, redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async (event) => {
	// if session exists, redirect to root page
	if (event.locals.user) {
		return redirect(302, "/");
	}
	return {};
};

export const actions = {
	default: async ({request, cookies}) => {
		const {email, username, password} = Object.fromEntries(await request.formData()) as Record<string, string>

		// check if already exists in database
		const existingUserEmail = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if (existingUserEmail) {
			return fail(400, {message: "Email already used"})
		}

		const existingUserName = await prisma.user.findUnique({
			where: {
				name: username
			}
		});

		if (existingUserName) {
			return fail(400, {message: "Username already used"})
		}

		// generate user id
		const userId = generateId(15)
		// hash password
		const hashedPassword = await new Argon2id().hash(password)

		// create user in database
		const user = await prisma.user.create({
			data: {
				id: userId, email: email, name: username, password: hashedPassword
			}
		})

		// create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".", ...sessionCookie.attributes
		});

		// redirect to root page
		redirect(302, "/");
	}
};