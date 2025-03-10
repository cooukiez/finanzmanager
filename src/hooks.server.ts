// src/hooks.server.ts
// Authentifizierung mit Lucia
import { lucia } from "$lib/server/auth";

// SvelteKit-Tools für Hooks und Redirects
import { type Handle, redirect } from "@sveltejs/kit";

// Zur Kombination mehrerer Hooks
import { sequence } from "@sveltejs/kit/hooks";

// Authentifizierungs-Hook: Verarbeitet die Authentifizierung (Session-Handling)
export const authentication: Handle = async ({ event, resolve }) => {

  // Ruft die Session-ID aus den Cookies ab
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    // Keine Session vorhanden -> Setze `user` und `session` auf null
    event.locals.user = null;
    event.locals.session = null;

    // Weiter mit der Anfrage
    return resolve(event);
  }

  // Validierung der Session mit Lucia
  const { session, user } = await lucia.validateSession(sessionId);

  // Wenn die Session gültig (frisch) ist, aktualisiere die Session-Cookies
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Gültig für die gesamte Domain
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  // Falls die Session nicht gültig ist, erstelle ein leeres Session-Cookie
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  // Benutzer- und Session-Details in `locals` speichern (zugänglich für den Server)
  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};


// Autorisierungs-Hook: Verarbeitet den Zugriff auf geschützte Seiten basierend auf Benutzerrollen
const authorization: Handle = async ({ event, resolve }) => {
  let onRoot = event.url.pathname === "/";
  let onPublicDomain =
    event.url.pathname.startsWith("/auth") ||
    event.url.pathname.startsWith("/public");
  let onAdminPage = event.url.pathname.startsWith("/admin");

  if (onPublicDomain && event.locals.user) {
    redirect(303, "/");
  }

  if (!onRoot && !onPublicDomain && !event.locals.user) {
    redirect(303, "/");
  }

  if (onAdminPage && event.locals.user?.role !== "admin") {
    redirect(303, "/");
  }

  return resolve(event);
};

// Kombinierter Hook: Erst Authentifizierung, dann Autorisierung
export const handle: Handle = sequence(authentication, authorization);
