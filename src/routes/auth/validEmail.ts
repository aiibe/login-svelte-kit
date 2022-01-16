import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
const account = JSON.parse(import.meta.env.VITE_FIREBASE_ACCOUNT as string);

const app = getApps().length
	? getApp()
	: initializeApp({
			credential: cert(account)
	  });

const auth = getAuth(app);

export async function post({
	body: { email }
}): Promise<{ body: { email?: string; error?: string } }> {
	try {
		const hasUser = await auth.getUserByEmail(email);
		return {
			body: {
				email: hasUser.email
			}
		};
	} catch (error) {
		return {
			body: {
				error: 'EMAIL CANNOT BE FOUND'
			}
		};
	}
}
