import {redirect} from "@sveltejs/kit";

import type {PageServerLoad} from "./$types";
import {adminDashboard, loginPage, userHomepage} from "$lib/config/routes";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, loginPage);
	}

	if (event.locals.user.role == "user") {
		return redirect(302, userHomepage);
	}

	if (event.locals.user.role == "admin") {
		return redirect(302, adminDashboard)
	}

	return {
		user: event.locals.user
	};
};