<script context="module" lang="ts">
	export async function load({ session }) {
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
