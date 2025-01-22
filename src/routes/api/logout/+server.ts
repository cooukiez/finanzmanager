// src/routes/api/logout/+server.ts
import {lucia} from "$lib/server/auth";

import {fail, json} from "@sveltejs/kit";
import type {RequestEvent} from "./$types";

export const POST = async (event: RequestEvent) => {
    if (!event.locals.session) {
        return fail(401, {message: 'Not authenticated'});
    }

    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '/',
        ...sessionCookie.attributes
    });

    return json({success: true});
};