import { prisma } from "$lib/server/prisma/user";
import { lucia } from "$lib/server/auth";

import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";

import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { loginFormSchema } from "../schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    // find user in database
    const user = await prisma.user.findUnique({
      where: {
        name: form.data.username,
      },
    });

    // check if user exists
    if (!user) {
      setError(form, "username", "Incorrect username or password");
      setError(form, "password", "Incorrect username or password");
      return fail(400, {
        form,
      });
    }

    // check password
    const validPassword = await new Argon2id().verify(
        user.password,
        form.data.password
    );
    if (!validPassword) {
      setError(form, "username", "Incorrect username or password");
      setError(form, "password", "Incorrect username or password");
      return fail(400, {
        form,
      });
    }

    // create session
    const session = await lucia.createSession(user.id, []);
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    // redirect to root page
    redirect(302, "/");
  },
};
