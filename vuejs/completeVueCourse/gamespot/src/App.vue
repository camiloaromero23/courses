<template>
	<div>
		<app-header />
		<router-view />
		<app-footer />
	</div>
</template>

<script>
	import AppHeader from './components/Header';
	import AppFooter from './components/Footer';
	export default {
		name: 'App',
		components: {
			AppFooter,
			AppHeader,
		},
		created() {
			this.$store.dispatch('admin/refreshToken');
		},
	};
</script>

<style>
	@import 'assets/style.css';
</style>
