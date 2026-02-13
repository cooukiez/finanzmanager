import {
  checkExistingUser,
  createUser,
  deleteUser,
  prisma,
  updateUser
} from "$lib/server/prisma/user";

import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

// Lädt die Benutzer-Daten von der Datenbank
export const load: PageServerLoad = async () => {
  let users;
  try {
    // Holt alle Benutzer aus der Datenbank
    users = await prisma.user.findMany();
  } catch (err) {
    // Fehlerbehandlung: Falls das Abrufen der Benutzer fehlschlägt, wird der Fehler protokolliert
    console.error(err);
    // Wirft eine 500-Fehlermeldung, wenn das Abrufen der Benutzer fehlschlägt
    throw fail(500, { message: "Failed fetch users" });
  }
  // Gibt die Benutzer zurück, wenn das Abrufen erfolgreich war
  return {
    users: users,
  };
};

// Aktionen für Benutzerverwaltung: Erstellen, Löschen und Aktualisieren
export const actions = {
  // Erstellen eines neuen Benutzers
  create: async ({ request }) => {
    const formData = await request.formData();

    // Holt die Formulardaten für Name, E-Mail, Rolle und Passwort
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;

    // Überprüft, ob der Benutzer bereits existiert
    if (await checkExistingUser(name, email)) {
      return fail(400, {
        error: true,
        message: "User Already Exists",
        name,
        email,
        role,
        password,
      });
    }

    // Erstellt den Benutzer, wenn er noch nicht existiert
    await createUser(name, email, role, password);
    return {
      success: true,
    };
  },

  // Löschen eines Benutzers
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    try {
      // Löscht den Benutzer aus der Datenbank
      await deleteUser(id);
      return {
        success: true,
      };
    } catch (err) {
      // Fehlerbehandlung: Falls das Löschen des Benutzers fehlschlägt, wird der Fehler protokolliert
      console.error(err);
      // Wirft eine 500-Fehlermeldung, wenn das Löschen fehlschlägt
      return fail(500, { message: "Failed to delete user" });
    }
  },

  // Aktualisieren eines bestehenden Benutzers
  update: async ({ request }) => {
    const { id, newname, newemail, newrole } = Object.fromEntries(
      await request.formData()
    ) as {
      id: string;
      newname: string;
      newemail: string;
      newrole: string;
    };

    try {
      // Aktualisiert den Benutzer in der Datenbank
      await updateUser(id, newname, newemail, newrole);
      return {
        success: true,
        id,
        newname,
        newemail,
        newrole,
      };
    } catch (error) {
      // Fehlerbehandlung: Falls das Aktualisieren des Benutzers fehlschlägt, wird der Fehler protokolliert
      console.error("Error updating user:", error);
      // Wirft eine 500-Fehlermeldung, wenn das Aktualisieren fehlschlägt
      return fail(500, { message: "Failed to update user" });
    }
  },
} satisfies Actions;
