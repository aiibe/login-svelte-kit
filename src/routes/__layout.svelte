<script>
	import Header from '../ui/Header.svelte';
	import Footer from '../ui/Footer.svelte';
	import '../styling/global.scss';
</script>

<svelte:head>
	<title>Login Svelte Kit</title>
</svelte:head>

<Header />
<slot />
<Footer />
