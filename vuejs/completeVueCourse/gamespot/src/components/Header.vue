<template>
	<header>
		<div class="container header_container">
			<div class="logo"><router-link to="/">GameSpot</router-link></div>
			<div class="login" v-if="!isAuthenticated">
				<router-link to="/sign-in"
					><img :src="require('../assets/images/login.png')" alt=""
				/></router-link>
			</div>
			<div v-else>
				<ul>
					<li><span @click="logoutUser">Log out</span></li>
					<li>
						<router-link to="/dashboard">Dashboard</router-link>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'AppHeader',
		computed: {
			isAuthenticated() {
				return this.$store.getters['admin/isAuthenticated'];
			},
		},
		methods: {
			logoutUser() {
				this.$store.commit('admin/logoutUser');
			},
		},
	};
</script>

<style scoped></style>
