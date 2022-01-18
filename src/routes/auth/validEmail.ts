import { SIGN_IN } from './_auth';

// This step's purpose is only to check whether the email is found
// Therefore the password can be anything
export async function post({
	body: { email }
}): Promise<{ body: { email?: string; error?: string } }> {
	try {
		const res = await fetch(SIGN_IN, {
			method: 'POST',
			headers: { 'CONTENT-TYPE': 'application/json' },
			body: JSON.stringify({ email, password: 'XXX-XXX' })
		});

		// Look for error message
		const {
			error: { message }
		} = await res.json();

		return {
			body: message === 'EMAIL_NOT_FOUND' ? { error: 'EMAIL CANNOT BE FOUND' } : { email }
		};
	} catch (error) {
		console.log(error);
	}
}
