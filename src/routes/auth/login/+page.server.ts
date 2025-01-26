import {prisma} from '$lib/server/prisma/user';
import {lucia} from '$lib/server/auth';

import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {Argon2id} from "oslo/password";

import {fail, redirect} from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types";

import {formSchema} from "./schema";

export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		// find user in database
		const user = await prisma.user.findUnique({
			where: {
				name: form.data.username
			}
		})

		// check if user exists
		if (!user) {
			return fail(400, {error: true, message: "Incorrect username or password"})
		}

		// check password
		const validPassword = await new Argon2id().verify(user.password, form.data.password);
		if (!validPassword) {
			return fail(400, {error: true, message: "Incorrect username or password"})
		}

		// create session
		const session = await lucia.createSession(user.id, [])
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})

		// redirect to root page
		redirect(302, "/")
	},
};

/*
export const actions: Actions = {
	default: async ({request, cookies}) => {
		const {email, password} = Object.fromEntries(await request.formData()) as Record<string, string>

		// find user in database
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		// check if user exists
		if (!user) {
			return fail(400, {error: true, message: "Incorrect username or password"})
		}

		// check password
		const validPassword = await new Argon2id().verify(user.password, password);
		if (!validPassword) {
			return fail(400, {error: true, message: "Incorrect username or password"})
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
};*/
