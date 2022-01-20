<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ session }: LoadInput): Promise<LoadOutput> {
		const { user } = session;
		if (user)
			return {
				status: 302,
				redirect: '/protected'
			};

		return { props: {} };
	}
</script>

<script>
	import LoginForm from '../ui/LoginForm.svelte';
</script>

<LoginForm />
