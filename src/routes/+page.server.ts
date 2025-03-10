import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { adminDashboard, loginPage, userHomepage } from "$lib/config/routes";

export const load: PageServerLoad = async (event) => {
  // Wenn kein Benutzer eingeloggt ist, zur Login-Seite weiterleiten
  if (!event.locals.user) {
    return redirect(302, loginPage);
  }

  // Wenn der Benutzer die Rolle "user" hat, zur Benutzer-Homepage weiterleiten
  if (event.locals.user.role == "user") {
    return redirect(302, userHomepage);
  }

  // Wenn der Benutzer die Rolle "admin" hat, zum Admin-Dashboard weiterleiten
  if (event.locals.user.role == "admin") {
    return redirect(302, adminDashboard);
  }

  // Falls keiner der obigen Fälle zutrifft, den Benutzer zurückgeben
  return {
    user: event.locals.user,
  };
};