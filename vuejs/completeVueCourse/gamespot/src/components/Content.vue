<template>
	<div class="container">
		<div class="home_container">
			<md-card v-for="(post, index) in posts" :key="index">
				<md-card-media md-ratio="16:9">
					<img style="width: 100%" :src="post.image" alt="" />
				</md-card-media>
				<md-card-header>
					<h2 class="md-title">
						{{ post.title }}
					</h2>
					<div class="md-subhead">
						<div>
							{{ post.description }}
						</div>
					</div>
				</md-card-header>
				<md-card-actions>
					<app-review-button
						type="link"
						:linkTo="`/post/${post.id}`"
						:addClass="['small_link']"
					>
						See review
					</app-review-button>
				</md-card-actions>
			</md-card>
			<div class="load_more">
				<app-review-button
					type="btn"
					:addClass="['small_link']"
					:action="loadMore"
				>
					Load more
				</app-review-button>
			</div>
		</div>
	</div>
</template>

<script>
	// import posts from '../assets/posts';
	export default {
		name: 'AppContent',

		created() {
			this.$store.dispatch('posts/getAllPosts', {
				limit: 3,
			});
		},
		computed: {
			posts() {
				return this.$store.getters['posts/getAllPosts'];
			},
		},
		methods: {
			loadMore() {
				this.$store.dispatch('posts/getAllPosts', {
					limit: this.posts.length + 3,
				});
			},
		},
	};
</script>

<style scoped></style>
