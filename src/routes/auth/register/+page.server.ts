import { checkExistingUser, prisma } from "$lib/server/prisma/user";
import { lucia } from "$lib/server/auth";

import { generateId } from "lucia";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";

import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { registerFormSchema } from "../schema";

// Lädt das Formular mit der Validierung für die Registrierung
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(registerFormSchema)),
  };
};

// Definiert die Aktionen für die Benutzerregistrierung
export const actions = {
  default: async (event) => {
    // Validiert das Formular mit dem Zod-Register-Schema
    const form = await superValidate(event, zod(registerFormSchema));

    // Wenn das Formular ungültig ist, wird der Fehlerstatus 400 zurückgegeben
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    // Überprüft, ob der Benutzername oder die E-Mail-Adresse bereits existieren
    if (await checkExistingUser(form.data.username, form.data.email)) {
      setError(form, "username", "Username or Email already used");
      setError(form, "email", "Username or Email already used");
      return fail(400, {
        form,
      });
    }

    // Generiert eine Benutzer-ID
    const userId = generateId(15);

    // Hashing des Passworts
    const hashedPassword = await new Argon2id().hash(form.data.password);

    // Erstellt einen neuen Benutzer in der Datenbank
    const user = await prisma.user.create({
      data: {
        id: userId,
        email: form.data.email,
        name: form.data.username,
        password: hashedPassword
      },
    });

    // Erstellt eine Sitzung für den Benutzer
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Setzt das Sitzungscookie im Browser des Benutzers
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    // Leitet den Benutzer nach erfolgreicher Registrierung zur Startseite weiter
    redirect(302, "/");
  },
};
