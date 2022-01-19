import * as cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies;
	request.locals.user.signedIn = cookies.token ? true : false;

	const response = await resolve(request);
	return { ...response };
}

export async function getSession(request) {
	const user = request.locals.user;

	return user.token ? { user } : {};
}
