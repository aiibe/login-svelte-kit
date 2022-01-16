import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(import.meta.env.VITE_SERVICE_ACCOUNT as string);

const app = initializeApp({
	credential: cert(serviceAccount)
});

const auth = getAuth(app);

export async function get() {
	let hasUser = null;
	try {
		hasUser = await auth.getUserByEmail('demo@email.com');
	} catch (error) {}

	return {
		body: {
			data: hasUser
		}
	};
}
