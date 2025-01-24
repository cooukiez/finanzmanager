import {checkExistingUser, updateUser, deleteUser, prisma, updateUser} from "$lib/server/prisma/user";

import {fail} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
import type {Actions} from "../../../.svelte-kit/types/src/routes/admin/$types";
import {Argon2id} from "oslo/password";

export const load: PageServerLoad = async () => {
    let user
    try {
        user = await prisma.user.findMany()
    } catch (err) {
        console.log(err)
        throw fail(500, {message: 'Failed to fetch user'});
    }

    return {
        user : user
    }
}

export const actions = {
    update: async ({request}) => {
        const {id, newname, newemail, newpassword} = Object.fromEntries(await request.formData()) as {
            id: string,
            newname: string,
            newemail: string,
            newpassword: string,
        };

        const hashedPassword = await new Argon2id().hash(newpassword)

        try {
            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: newname,
                    email: newemail,
                    password: hashedPassword,
                },
            })
        } catch (error) {
            console.error("Error updating user:", error);
            return fail(500, {message: "Failed to update user"});
        }
    },

} satisfies Actions;