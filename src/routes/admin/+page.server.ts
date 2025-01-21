import type { Actions } from './$types';
import {prisma} from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
    delete_user: async ({request}) => {
        const formData = await request.formData();
        const id = formData.get("id") as string;

        try {
            await prisma.user.delete({
                where: {id
                },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting user:", error);
            return fail(500, { message: "Failed to delete user" });
        }
    },

    update_user: async ({request}) => {
        const {id, newname, newemail, newrole} = Object.fromEntries(await request.formData()) as { id:string, newname: string, newemail: string, newrole: string };
        try {
            await prisma.user.update({
                where: {id},
                data: {
                    name: newname,
                    email: newemail,
                    role: newrole,
                }
            });
            return { success: true };
        } catch (error) {
            console.error("Error updating user:", error);
            return fail(500, { message: "Failed to update user" });
        }
    },

} satisfies Actions;

