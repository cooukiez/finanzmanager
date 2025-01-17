// src/routes/api/delete_user/[userId].ts
import { deleteUser } from "$lib/server/prisma";
import { fail, json } from "@sveltejs/kit";

interface RouteParams {
  userId: string; 
}

// what should these endpoints be called
export const DELETE = async ({ params }: { params: RouteParams }) => {
  const { userId } = params;

  try {
    await deleteUser(userId);
    return json({ success: true });
  } catch (err) {
    console.error(err);
    throw fail(500, { message: 'Failed to delete user' });
  }
};