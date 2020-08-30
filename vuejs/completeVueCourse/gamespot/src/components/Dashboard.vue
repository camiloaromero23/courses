<template>
	<div>
		<div class="container dashboard_container">
			<div class="admin_nav">
				<ul>
					<li>
						<router-link to="/dashboard/addPost">
							Add posts
						</router-link>
					</li>
					<li>
						<router-link to="/dashboard/listPosts">
							Posts list
						</router-link>
					</li>
				</ul>
			</div>

			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AppDashboard',
	};
</script>

<style scoped></style>
