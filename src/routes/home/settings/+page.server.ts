import { checkExistingUsername, checkExistingEmail, prisma, updateUserPassword, updateUserSettings } from "$lib/server/prisma/user";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { Argon2id } from "oslo/password";
import { getUser } from "$lib/server/prisma/user";

// Lädt die Benutzerdaten basierend auf der lokalen Benutzer-ID
export const load: PageServerLoad = async (event) => {
  let userId;
  try {
    if (event.locals.user) {
      userId = await getUser(event.locals.user.id);
    }
  }
  catch (err) {
    console.error(err);
    throw fail(500, { message: "Failed to fetch user" });
  }

  return {
    userId: userId,
  };
};

export const actions = {
  // Aktion zum Aktualisieren der Benutzerinformationen
  update_info: async ({ request, locals }) => {
    const user = locals.user;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user) {
      return fail(401, { message: "Unauthorized" });
    }

    // Extrahieren der neuen Benutzerdaten aus dem Formular
    const { newname, newemail } = Object.fromEntries(
      await request.formData()
    ) as {
      newname: string;
      newemail: string;
    };

    // Überprüfung der E-Mail-Validität
    if (!emailRegex.test(newemail)) {
      console.log("invalid email");
      return fail(401, { message: "Invalid email" });
    }

    // Überprüfung, ob der Benutzername bereits vergeben ist
    if (newname != user.name) {
      if (await checkExistingUsername(newname)) {
        console.log("user already exists");
        return fail(400, {
          error: true,
          message: "Username already exists"
        });
      }
    }

    // Überprüfung, ob die E-Mail bereits vergeben ist
    if (newemail != user.email) {
      if (await checkExistingEmail(newemail)) {
        console.log("Email already exists");
        return fail(400, {
          error: true,
          message: "Email already exists"
        });
      }
    }

    // Aktualisierung der Benutzereinstellungen
    try {
      await updateUserSettings(user.id, newname, newemail);
      console.log("updated user", user);
      return { success: true };
    } catch (error) {
      return fail(500, { message: "Failed to update user" });
    }
  },

  // Aktion zum Ändern des Passworts
  update_pass: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) {
      return fail(401, { message: "Unauthorized" });
    }

    // Extrahieren der Passwörter aus dem Formular
    const { newpassword, currentpassword } = Object.fromEntries(
      await request.formData()
    ) as {
      newpassword: string;
      currentpassword: string;
    };

    // Neues Passwort hashen
    const hashedPassword = await new Argon2id().hash(newpassword);

    // Benutzerkonto aus der Datenbank abrufen
    const account = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!account) {
      return fail(500, { message: "No user found." });
    }

    // Überprüfung des aktuellen Passworts
    const validPassword = await new Argon2id().verify(
      account.password,
      currentpassword,
    );

    if (!validPassword) {
      return fail(400, {
        message: "Incorrect password"
      });
    }

    // Aktualisieren des Passworts in der Datenbank
    try {
      await updateUserPassword(user.id, hashedPassword);
      return { success: true, hashedPassword };
    } catch (error) {
      return fail(500, { message: "Failed to update user" });
    }
  },

} satisfies Actions;
