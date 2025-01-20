// src/hooks.server.ts
import { lucia } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";
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
      ...sessionCookie.attributes
    });
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

const authorization: Handle = async ({ event, resolve }) => {
  if (
      (event.url.pathname.startsWith("/login") ||
          event.url.pathname.startsWith("/register")) &&
      event.locals.user
  ) {
    return redirect(303, "/");
  }

  if (
      event.url.pathname !== "/" &&
      !event.url.pathname.startsWith("/login") &&
      !event.url.pathname.startsWith("/register") &&
      !event.locals.user
  ) {
    return redirect(303, "/");
  }

  if (
      event.url.pathname.startsWith("/admin") &&
      event.locals.user?.role !== "admin"
  ) {
    return redirect(303, "/");
  }

  return resolve(event);
};

export const handle: Handle = sequence(authentication, authorization);