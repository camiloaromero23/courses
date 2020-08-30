/* eslint-disable*/
import Vue from 'vue';
import router from '../../routes';

const API_KEY = `AIzaSyAJ2qsbBBi3q7n0560YpPNSz7yPNFWI02M`;
const AUTH = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const admin = {
	namespaced: true,
	state: {
		token: null,
		refreshToken: null,
		authFailed: false,
		refreshing: true,
		addPost: false,
		imageUpload: null,
		adminPosts: null,
	},
	getters: {
		isAuthenticated(state) {
			return !!state.token;
		},
		isRefreshing(state) {
			return state.refreshing;
		},
		addPostStatus(state) {
			return state.addPost;
		},
		imageUpload(state) {
			return state.imageUpload;
		},
		getAdminPosts(state) {
			return state.adminPosts;
		},
	},
	mutations: {
		authUser(state, authData) {
			state.token = authData.idToken;
			state.refreshToken = authData.refreshToken;
			if (authData.type === 'signIn') router.push('/dashboard').then();
		},
		authFailed(state, type) {
			state.authFailed = type !== 'reset';
		},
		logoutUser(state) {
			state.token = null;
			state.refreshToken = null;

			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
			if (router.history.current.path !== '/') {
				router.push('/').then();
			}
		},
		refreshingFinished(state) {
			state.refreshing = false;
		},
		postSuccess(state) {
			state.addPost = true;
		},
		clearAddPost(state) {
			state.addPost = false;
		},
		imageUpload(state, imageData) {
			state.imageUpload = imageData.secure_url;
		},
		clearImageUpload(state) {
			state.imageUpload = null;
		},
		getAdminPosts(state, posts) {
			state.adminPosts = posts;
		},
	},
	actions: {
		signIn({ commit }, payload) {
			Vue.http
				.post(AUTH, {
					...payload,
					returnSecureToken: true,
				})
				.then(response => response.json())
				.then(authData => {
					commit('authUser', { ...authData, type: 'signIn' });
					localStorage.setItem('token', authData.idToken);
					localStorage.setItem('refreshToken', authData.refreshToken);
				})
				.catch(error => {
					commit('authFailed');
				});
		},
		refreshToken({ commit }) {
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				Vue.http
					.post(
						`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
						{
							grant_type: 'refresh_token',
							refresh_token: refreshToken,
						},
					)
					.then(response => response.json())
					.then(authData => {
						commit('authUser', {
							idToken: authData.id_token,
							refreshToken: authData.refresh_token,
							type: 'refresh',
						});
						commit('refreshingFinished');
						localStorage.setItem('token', authData.id_token);
						localStorage.setItem(
							'refreshToken',
							authData.refresh_token,
						);
					});
			} else {
				commit('refreshingFinished');
			}
		},
		addPost({ commit, state }, payload) {
			Vue.http
				.post(`posts.json?auth=${state.token}`, payload)
				.then(response => response.json())
				.then(response => {
					commit('postSuccess');
					setTimeout(() => {
						commit('clearAddPost');
					}, 3000);
				});
		},
		imageUpload({ commit }, payload) {
			const CLOUDINARY_URL =
				'https://api.cloudinary.com/v1_1/dvx3uuuau/image/upload';
			const CLOUDINARY_PRESET = 'slmue694';

			let formData = new FormData();
			formData.append('file', payload);
			formData.append('upload_preset', CLOUDINARY_PRESET);

			Vue.http
				.post(CLOUDINARY_URL, formData, {
					headers: {
						'Content-type': 'application/x-www-form-urlencoded',
					},
				})
				.then(response => response.json())
				.then(response => {
					commit('imageUpload', response);
				});
		},
		getAdminPosts({ commit }) {
			Vue.http
				.get('posts.json')
				.then(response => response.json())
				.then(response => {
					let posts = [];
					for (const key in response) {
						posts = [...posts, { ...response[key], id: key }];
					}
					commit('getAdminPosts', posts.reverse());
				});
		},
		deletePost({ commit, state }, payload) {
			Vue.http
				.delete(`posts/${payload}.json?auth=${state.token}`)
				.then(response => {
					let newPosts = [];
					state.adminPosts.forEach(post => {
						if (post.id !== payload) {
							newPosts = [...newPosts, post];
						}
					});
					commit('getAdminPosts', newPosts);
				});
		},
	},
};

export default admin;
