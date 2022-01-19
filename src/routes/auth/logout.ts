import * as cookie from 'cookie';

export async function post() {
	const headers = {
		'Set-Cookie': cookie.serialize('token', '', {
			httpOnly: true,
			sameSite: 'lax',
			path: '/'
		})
	};

	return { headers, body: { signOut: 'ok' } };
}
