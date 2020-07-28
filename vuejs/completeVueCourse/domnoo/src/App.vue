<template>
	<div>
		<app-header />
		<div>
			<app-featured />
			<app-menu />
			<app-call-us />
			<app-newsletter />
		</div>

		<app-footer />
	</div>
</template>

<script>
	import AppFooter from './components/Footer';
	import AppHeader from './components/Header';
	import AppFeatured from './components/Featured';
	import AppMenu from './components/Menu';
	import AppCallUs from './components/CallUs';
	import AppNewsletter from './components/Newsletter';
	export default {
		components: {
			AppNewsletter,
			AppCallUs,
			AppFooter,
			AppHeader,
			AppFeatured,
			AppMenu,
		},
	};
</script>

<style scoped>
	@import './assets/style.css';
</style>
