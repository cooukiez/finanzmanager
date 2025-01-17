import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// const sessionId = event.cookies.get(lucia.sessionCookieName);

	// // check for automatic session invalidation
  // const session = await lucia.validateSession(event);

  // Redirect to login if user is not authenticated and not already on login/register page
  // if (!session && !['/login', '/register'].includes(event.url.pathname)) {
  //   throw redirect(302, '/login');
  // }

	throw redirect(302, '/login');

  // Continue processing the request
  return resolve(event);
};
