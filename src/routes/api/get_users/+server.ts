import { prisma } from "$lib/server/prisma/user";
import { fail } from "@sveltejs/kit";

export async function GET() {
  try {
    // Holt alle Benutzer aus der Datenbank
    const users = await prisma.user.findMany();

    // Gibt die Benutzer als JSON-Antwort zurück
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    // Fehlerbehandlung: Protokolliert den Fehler
    console.error(err);

    // Wirft eine 500-Fehlermeldung, falls das Abrufen der Benutzer fehlschlägt
    throw fail(500, { message: "Failed fetch users" });
  }
}
