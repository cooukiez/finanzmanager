import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  // Gibt Benutzerdaten und die aktuelle Sitzung (Session) aus `locals` zurück
  return {
    user: locals.user, // Enthält die Benutzerinformationen, falls der Benutzer eingeloggt ist
    session: locals.session, // Enthält die aktuellen Sitzungsdaten, falls vorhanden
  };
};
