<script lang="ts">
	import { fly } from 'svelte/transition';

	export let email: string;
	export let placeholder: string;
	export let checkEmail: () => void;
</script>

<form on:submit|preventDefault={checkEmail} class="form__content">
	<input type="email" {placeholder} bind:value={email} />
	<button type="submit" disabled={email.length < 2}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="#5393C1">
			{#if email.length > 2}
				<path
					d="M13.025 0L10.178 3.08509L16.354 9.82255H0V14.1775H16.354L10.178 20.9149L13.025 24L24 12L13.025 0Z"
					transition:fly={{ x: -25, y: 0 }}
				/>
			{:else}
				<path
					transition:fly={{ x: 25, y: 0 }}
					d="M0 0V20H24V0H0ZM6.623 8.81L2 15.1567V4.64778L6.623 8.81ZM2.482 2.22222H21.517L12 10.7922L2.482 2.22222ZM8.176 10.2089L12 13.6522L15.83 10.2033L21.442 17.7778H2.663L8.176 10.2089ZM17.384 8.80444L22 4.64778V15.0344L17.384 8.80444Z"
				/>
			{/if}
		</svg>
	</button>
</form>
