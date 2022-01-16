<script lang="ts">
	import EmailForm from './EmailForm.svelte';

	let hasEmail = false,
		hasValidPassword = false;
</script>

<section class="login">
	<div class="form">
		<div class="form__header">
			<div class="form__header-left">
				<h1>Login</h1>
			</div>
		</div>
		{#if !hasEmail}
			<EmailForm bind:hasEmail />
		{/if}
	</div>
</section>

<style type="scss">
	.form {
		overflow: hidden;
		border-radius: 15px;
		background-color: white;
		margin: 0 15px;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);

		&__header {
			&-left {
				padding: 15px;
			}

			h1 {
				margin: 0;
			}
		}
	}
</style>
