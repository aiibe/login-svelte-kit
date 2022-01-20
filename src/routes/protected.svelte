<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { requestSignOut } from '$lib/request';
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

	const handleSignOut = async () => {
		const { success } = await requestSignOut();
		if (success) {
			$session = {};
			goto('/');
		}
	};
</script>

<div class="card">
	<div class="card__body">
		<p>🎉 Success ! Here's your token :</p>
		<pre>{token}</pre>
	</div>
	<div class="card__footer">
		<button on:click={handleSignOut}>Sign Out</button>
	</div>
</div>

<style type="scss">
	.card {
		padding: 20px;
		border-radius: 15px;
		background-color: #fff;

		&__body {
			pre {
				background-color: rgb(236, 236, 236);
				height: 60px;
				overflow-x: scroll;
				padding: 5px;
			}
		}

		&__footer {
			display: flex;
			justify-content: flex-end;

			button {
				cursor: pointer;
				padding: 10px;
				border: 0;
				border-radius: 15px;
				font-weight: bold;
			}
		}
	}
</style>
