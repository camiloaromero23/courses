<template>
	<div>
		<router-link
			v-if="type === 'link'"
			:to="linkTo"
			:class="['button_default']"
			:style="ovStyle"
		>
			<slot />
		</router-link>
		<div
			v-if="type === 'btn'"
			:class="['button_default']"
			:style="ovStyle"
			@click="action"
		>
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AppReviewButton',
		props: ['linkTo', 'ovStyle', 'type', 'action'],
	};
</script>

<style scoped></style>
