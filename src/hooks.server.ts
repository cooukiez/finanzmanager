// src/hooks.server.ts
import { lucia } from "$lib/server/auth";
import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const authentication: Handle = async ({ event, resolve }) => {
  // get session id from cookies
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    // no session, set user and session to null
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

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

export const handle: Handle = sequence(authentication, authorization);
