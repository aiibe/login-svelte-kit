export type ResponseValidEmail = {
	error?: string;
	email?: string;
};

export type ResponseLogin = {
	email?: string;
	error?: string;
	idToken: string;
};

const headers = {
	'Content-Type': 'application/json'
};

// Call '/auth/validEmail' endpoint to check email validity
export const requestValidEmail = async (email: string): Promise<ResponseValidEmail> => {
	const res = await fetch('/auth/validEmail', {
		method: 'POST',
		headers,
		body: JSON.stringify({ email })
	});
	return await res.json();
};

// Call '/auth/login' endpoint to truly login with email/password
export const requestLogin = async (email: string, password: string): Promise<ResponseLogin> => {
	const res = await fetch('/auth/login', {
		method: 'POST',
		headers,
		body: JSON.stringify({ email, password })
	});
	return await res.json();
};
