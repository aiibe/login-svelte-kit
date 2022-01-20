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

		<div class="form__body">
			{#if !validEmail}
				<EmailForm {checkEmail} bind:email bind:placeholder={emailPlaceholder} />
			{/if}

			{#if !validPassword}
				<PasswordForm {login} bind:password bind:placeholder={passwordPlaceholder} />
			{/if}
		</div>
	</div>
</section>
