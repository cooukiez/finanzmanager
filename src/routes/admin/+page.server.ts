import type { Actions } from './$types';
import {prisma} from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
    delete_user: async ({request}) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;

        if (!email) {
            return fail(400,{message: "Email is required"})
        }

        try {
            await prisma.user.delete({
                where: {email
                },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting user:", error);
            return fail(500, { message: "Failed to delete user" });
        }
    },
} satisfies Actions;
