import type { EndpointOutput } from '@sveltejs/kit';
import { SIGN_IN } from './_auth';

type Params = {
	body: {
		email: string;
	};
};

type APIErrorResponse = { error: { message: string } };

// This step's purpose is only to check whether the email is found
// Therefore the password can be anything
export async function post({ body }: Params): Promise<EndpointOutput> {
	const { email } = body;
	const res = await fetch(SIGN_IN, {
		method: 'POST',
		headers: { 'CONTENT-TYPE': 'application/json' },
		body: JSON.stringify({ email, password: 'XXX-XXX' })
	});

	// Look for error message
	const { error }: APIErrorResponse = await res.json();
	const { message } = error;

	return {
		body: message === 'EMAIL_NOT_FOUND' ? { error: 'EMAIL CANNOT BE FOUND' } : { email }
	};
}
