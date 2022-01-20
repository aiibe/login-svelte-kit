<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ session }: LoadInput): Promise<LoadOutput> {
		if (!session.user)
			return {
				status: 302,
				redirect: '/'
			};

		return {
			props: { ...session.user }
		};
	}
</script>

<script lang="ts">
	export let token: string;

	let logged = true;

	async function handleSignOut() {
		const resp = await fetch('/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});
		const { signOut } = await resp.json();
		logged = signOut !== 'ok';
	}
</script>

<p>You have logged in with {token}</p>

<p>Is logged in : {logged}</p>
<button on:click={handleSignOut}>Sign Out</button>
