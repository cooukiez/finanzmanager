import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const handle = async ({ event, resolve }) => {
  const session = await lucia.getSession(event);

  // Redirect to login if user is not authenticated and not already on login/register page
  if (!session && !['/login', '/register'].includes(event.url.pathname)) {
    throw redirect(302, '/login');
  }

  // Continue processing the request
  return resolve(event);
};
