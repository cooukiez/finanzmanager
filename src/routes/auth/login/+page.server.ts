import { prisma } from "$lib/server/prisma/user";
import { lucia } from "$lib/server/auth";

import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";

import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { loginFormSchema } from "../schema";

// Lädt die Formularvalidierung für das Login-Formular
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginFormSchema)),
  };
};

// Definiert die Aktionen für das Login
export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginFormSchema)); // Validiert das Formular mit dem Zod-Schema
    if (!form.valid) {
      // Wenn das Formular ungültig ist, wird der Fehlerstatus 400 zurückgegeben
      return fail(400, {
        form,
      });
    }

    // Sucht den Benutzer in der Datenbank anhand des Benutzernamens
    const user = await prisma.user.findUnique({
      where: {
        name: form.data.username // Benutzernamen aus dem Formular
      },
    });

    // Überprüft, ob der Benutzer existiert
    if (!user) {
      setError(form, "username", "Incorrect username or password");
      setError(form, "password", "Incorrect username or password");
      return fail(400, {
        form,
      });
    }

    // Überprüft das Passwort des Benutzers
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

    // Wenn Benutzername und Passwort korrekt sind, wird eine Sitzung erstellt
    const session = await lucia.createSession(user.id, []);
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Setzt das Sitzungscookie im Browser des Benutzers
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    // Leitet den Benutzer nach erfolgreichem Login zur Startseite weiter
    redirect(302, "/");
  },
};