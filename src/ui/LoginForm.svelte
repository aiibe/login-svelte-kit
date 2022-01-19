<script lang="ts">
	import EmailForm from './EmailForm.svelte';
	import PasswordForm from './PasswordForm.svelte';

	let email = 'mail@mail.com';
	let emailPlaceholder = 'ENTER YOUR EMAIL';
	let validEmail = false;

	async function checkEmail() {
		const response = await fetch('/auth/validEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});
		const data = await response.json();

		if (!data.error) {
			email = data.email;
			validEmail = true;
		} else {
			email = '';
			emailPlaceholder = data.error;
		}
	}

	let password = '';
	let passwordPlaceholder = 'ENTER YOUR PASSWORD';
	let validPassword = false;

	async function login() {
		const response = await fetch('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		const { email: userEmail, idToken, error } = await response.json();

		if (error) {
			password = '';
			passwordPlaceholder = error;
		} else {
			validPassword = true;
		}
	}
</script>

<section class="login">
	<div class="form">
		<div class="form__header">
			<div class="form__header-left">
				<h1>Login</h1>
			</div>
		</div>

		{#if !validEmail}
			<EmailForm {checkEmail} bind:email bind:placeholder={emailPlaceholder} />
		{/if}

		{#if !validPassword}
			<PasswordForm {login} bind:password bind:placeholder={passwordPlaceholder} />
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
