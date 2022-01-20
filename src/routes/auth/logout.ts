import type { EndpointOutput } from '@sveltejs/kit';
import * as cookie from 'cookie';

export async function post(): Promise<EndpointOutput> {
	const headers = {
		'Set-Cookie': cookie.serialize('token', '', {
			httpOnly: true,
			sameSite: 'lax',
			path: '/'
		})
	};

	return { headers, body: { success: true } };
}
