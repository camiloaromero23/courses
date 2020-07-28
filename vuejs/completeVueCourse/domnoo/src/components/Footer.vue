<template>
	<footer>
		<div class="container">
			<div>
				<img :src="logoIcon" alt />
				<div class="contact">
					<div>Call us</div>
					<div>123456789</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import Logo from '../assets/images/logo.png';
	export default {
		name: 'AppFooter',
		data() {
			return {
				logoIcon: Logo,
			};
		},
	};
</script>

<style scoped></style>
