import {checkExistingUser, createUser, prisma} from '$lib/server/prisma';

import {fail} from '@sveltejs/kit';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async () => {
    let users
    try {
        users = await prisma.user.findMany()
    } catch (err) {
        console.error(err);
        throw fail(500, {message: 'Failed fetch users'});
    }
    return {
        users: users
    }
}

export const actions = {
    create: async ({request}) => {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const role = formData.get('role') as string;
        const password = formData.get('password') as string;

        if (await checkExistingUser(name, email)) {
            return fail(400, {
                error: true,
                message: 'User Already Exists',
                name,
                email,
                role,
                password
            })
        }
        await createUser(name, email, role, password);
        return {
            success: true,
        }
    },

    delete: async ({request}) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        try {
            await prisma.user.delete({where: {id}});
            return {
                success: true,
            }
        } catch (err) {
            console.error(err);
            return fail(500, {message: 'Failed to delete user'});
        }

    },

    update: async ({request}) => {
        const {id, newname, newemail, newrole} = Object.fromEntries(await request.formData()) as {
            id: string,
            newname: string,
            newemail: string,
            newrole: string
        };
        try {
            await prisma.user.update({
                where: {id},
                data: {
                    name: newname,
                    email: newemail,
                    role: newrole,
                }
            });
            return {
                success: true,
                id,
                newname,
                newemail,
                newrole
            };
        } catch (error) {
            console.error("Error updating user:", error);
            return fail(500, {message: "Failed to update user"});
        }
    },

} satisfies Actions;
