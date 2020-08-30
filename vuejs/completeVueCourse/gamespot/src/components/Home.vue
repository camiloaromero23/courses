<template>
	<div>
		<app-featured />
		<app-content />
	</div>
</template>

<script>
	import AppFeatured from './Featured';
	import AppContent from './Content';
	export default {
		name: 'AppHome',
		components: { AppContent, AppFeatured },
	};
</script>

<style scoped></style>
