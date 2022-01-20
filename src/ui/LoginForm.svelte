<script lang="ts">
	import { requestLogin, requestValidEmail, ResponseLogin, ResponseValidEmail } from '$lib/request';
	import EmailForm from './EmailForm.svelte';
	import PasswordForm from './PasswordForm.svelte';

	let email = 'mail@mail.com';
	let emailPlaceholder = 'ENTER YOUR EMAIL';
	let validEmail = false;

	async function checkEmail() {
		const data: ResponseValidEmail = await requestValidEmail(email);
		const { error: err, email: confirmedEmail } = data;

		if (!err) {
			email = confirmedEmail;
			validEmail = true;
		} else {
			email = '';
			emailPlaceholder = err;
		}
	}

	let password = '';
	let passwordPlaceholder = 'ENTER YOUR PASSWORD';
	let validPassword = false;

	async function login() {
		const data: ResponseLogin = await requestLogin(email, password);
		const { error: err, email: confirmedEmail, idToken } = data;

		if (err) {
			password = '';
			passwordPlaceholder = err;
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
