import {prisma} from '$lib/server/prisma/user';
import {lucia} from '$lib/server/auth';

import {setError, superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {Argon2id} from "oslo/password";

import {fail, redirect} from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types";

import {accountCreateFormSchema} from "./schema";
import {createAccount} from "$lib/server/prisma/account";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(accountCreateFormSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(accountCreateFormSchema));
        if (!form.valid) {
            return fail(400, {form});
        }

        if (event.locals.user) {
            await createAccount(form.data.name, event.locals.user.id);
        } else {
            setError(form, 'name', 'Invalid user session');
            return fail(400, {form});
        }


    },
};