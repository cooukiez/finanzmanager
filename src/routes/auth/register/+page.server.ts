import {checkExistingUser, prisma} from "$lib/server/prisma/user";
import {lucia} from "$lib/server/auth";

import {generateId} from "lucia";
import {setError, superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {Argon2id} from "oslo/password";

import {fail, redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

import {registerFormSchema} from "../schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(registerFormSchema)),
  };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(registerFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    if (await checkExistingUser(form.data.username, form.data.email)) {
      setError(form, "username", "Username or Email already used");
      setError(form, "email", "Username or Email already used");
      return fail(400, {
        form,
      });
    }

    // generate user id
    const userId = generateId(15);
    // hash password
    const hashedPassword = await new Argon2id().hash(form.data.password);

    // create user in database
    const user = await prisma.user.create({
      data: {
        id: userId,
        email: form.data.email,
        name: form.data.username,
        password: hashedPassword,
      },
    });

    // create session
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    // redirect to root page
    redirect(302, "/");
  },
};
