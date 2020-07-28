<template>
	<div class="call_us_container">
		<div class="container">
			<div class="first" v-scroll-reveal.reset="{ delay: 200, scale: 2 }">
				<h1>Hungry?</h1>
			</div>
			<div
				class="second"
				v-scroll-reveal.reset="{
					delay: 300,
					scale: 2,
					afterReveal: () => {
						secondAnim = true;
					},
				}"
			>
				<div v-if="secondAnim"><app-anim /></div>
			</div>
			<div class="third" v-scroll-reveal.reset="{ delay: 600, scale: 2 }">
				<span>Give us a call</span> <span> 6666-3399</span>
			</div>
		</div>
	</div>
</template>

<script>
	import AppAnim from './Anim';
	export default {
		name: 'AppCallUs',
		data() {
			return {
				secondAnim: false,
			};
		},
		components: { AppAnim },
	};
</script>

<style scoped></style>
