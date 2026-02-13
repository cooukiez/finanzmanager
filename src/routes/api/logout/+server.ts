// src/routes/api/logout/+server.ts
import { lucia } from "$lib/server/auth";

import { fail, json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export const POST = async (event: RequestEvent) => {
  // Überprüft, ob der Benutzer authentifiziert ist
  if (!event.locals.session) {
    return fail(401, { message: "Not authenticated" }); // Wenn keine Sitzung vorhanden ist, wird eine 401-Antwort zurückgegeben
  }

  // Ungültig macht die aktuelle Sitzung
  await lucia.invalidateSession(event.locals.session.id);

  // Erzeugt ein leeres Sitzungscookie
  const sessionCookie = lucia.createBlankSessionCookie();

  // Setzt das Sitzungscookie für den Benutzer
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: "/",
    ...sessionCookie.attributes
  });

  // Gibt eine Erfolgsmeldung zurück
  return json({ success: true });
};
