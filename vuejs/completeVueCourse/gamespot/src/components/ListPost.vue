<template>
	<div>
		<md-table>
			<md-table-row>
				<md-table-head>Title</md-table-head>
				<md-table-head>Description</md-table-head>
				<md-table-head>Rating</md-table-head>
				<md-table-head>Action</md-table-head>
			</md-table-row>
			<md-table-row v-for="(post, index) in posts" :key="index">
				<md-table-cell>{{ post.title }}</md-table-cell>
				<md-table-cell>{{ post.description }}</md-table-cell>
				<md-table-cell>{{ post.rating }}</md-table-cell>
				<md-table-cell>
					<div class="post_delete" @click="deleteHandler(post.id)">
						Delete
					</div>
				</md-table-cell>
			</md-table-row>
		</md-table>

		<md-dialog-confirm
			:md-active.sync="confirmDelete"
			md-title="Confirm delete"
			md-content="Are you sure you want to delete?"
			md-confirm-text="Yes"
			md-cancel-text="No"
			@md-cancel="onCancel"
			@md-confirm="onConfirm"
		/></div
></template>

<script>
	export default {
		name: 'AppListPost',
		data() {
			return {
				confirmDelete: false,
				toDelete: '',
			};
		},
		computed: {
			posts() {
				return this.$store.getters['admin/getAdminPosts'];
			},
		},
		created() {
			this.$store.dispatch('admin/getAdminPosts');
		},
		methods: {
			deleteHandler(postId) {
				this.confirmDelete = true;
				this.toDelete = postId;
			},
			onCancel() {
				this.confirmDelete = false;
				this.toDelete = '';
			},
			onConfirm() {
				this.confirmDelete = false;
				this.$store.dispatch('admin/deletePost', this.toDelete);
			},
		},
	};
</script>

<style scoped></style>
