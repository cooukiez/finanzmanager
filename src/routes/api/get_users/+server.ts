import {prisma} from "$lib/server/prisma/user";
import {fail} from "@sveltejs/kit";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), {status: 200});
  } catch (err) {
    console.error(err);
    throw fail(500, {message: "Failed fetch users"});
  }
}
