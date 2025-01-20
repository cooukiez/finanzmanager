// src/routes/api/update_user/[userId].ts
import {updateUser} from "$lib/server/prisma";
import {fail, json} from "@sveltejs/kit";

interface RouteParams {
	userId: string;
	name: string;
}

// what should these endpoints be called
export const PUT = async ({params}: { params: RouteParams }) => {
	const {userId, name} = params;

	try {
		await updateUser(userId, name);
		return json({success: true});
	} catch (err) {
		console.error(err);
		throw fail(500, {message: 'Failed to edit user'});
	}
}