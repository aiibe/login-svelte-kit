import type { EndpointOutput } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { SIGN_IN } from './_auth';

type Params = {
	body: {
		email: string;
		password: string;
	};
};

type APIResponse = {
	kind?: string;
	localId?: string;
	email?: string;
	displayName?: string;
	idToken?: string;
	register?: string;
	error?: {
		message: string;
		status: string;
	};
};

export async function post({ body }: Params): Promise<EndpointOutput> {
	const { email, password } = body;
	if (!email && !password)
		return {
			body: {
				status: 401,
				error: 'Bad Request'
			}
		};

	const res = await fetch(SIGN_IN, {
		method: 'POST',
		headers: { 'CONTENT-TYPE': 'application/json' },
		body: JSON.stringify({ email, password })
	});
	const { error: err, email: userEmail, idToken }: APIResponse = await res.json();

	// The email is correct, but invalid password
	if (err)
		return {
			body: {
				error: 'INVALID PASSWORD'
			}
		};

	// Ok
	return {
		headers: {
			'Set-Cookie': cookie.serialize('token', idToken, {
				httpOnly: true,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7,
				path: '/'
			})
		},
		body: { email: userEmail }
	};
}
