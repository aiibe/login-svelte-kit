<script context="module" lang="ts">
	export async function load({ session }) {
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
</script>

<p>You have logged in with {token}</p>
