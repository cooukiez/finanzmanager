import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, "/login");
	}

	if (event.locals.user.role == "admin") {
		return redirect(302, "/admin")
	}

	return {
		user: event.locals.user
	};
};

// export const actions: Actions = {
// 	default: async (event) => {
// 		if (!event.locals.session) {
// 			return fail(401);
// 		}

// 		await lucia.invalidateSession(event.locals.session.id);
// 		const sessionCookie = lucia.createBlankSessionCookie();
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: ".",
// 			...sessionCookie.attributes
// 		});

// 		return redirect(302, "/login");
// 	}
// };