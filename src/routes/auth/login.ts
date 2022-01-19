import * as cookie from 'cookie';
import { SIGN_IN } from './_auth';

type ARG = {
	body: {
		email: string;
		password: string;
	};
};

export async function post({ body: { email, password } }: ARG): Promise<{
	body: { email?: string; error?: string };
	headers?: any;
	status?: number;
}> {
	const res = await fetch(SIGN_IN, {
		method: 'POST',
		headers: { 'CONTENT-TYPE': 'application/json' },
		body: JSON.stringify({ email, password })
	});

	const {
		kind,
		localId,
		email: userEmail,
		displayName,
		idToken,
		register,
		error
	} = await res.json();

	// Invalid password
	if (error)
		return {
			body: {
				error: 'INVALID PASSWORD'
			}
		};

	// Ok
	const headers = {
		'Set-Cookie': cookie.serialize('token', idToken, {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	};

	return {
		status: 200,
		headers,
		body: { email }
	};
}
