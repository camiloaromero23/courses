/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './components/Home';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import DashboardWelcome from './components/DashboardWelcome';
import AddPost from './components/AddPost';
import ListPost from './components/ListPost';
import Post from './components/Post';
import App404 from './components/404';

Vue.use(VueRouter);

const authGuard = {
	beforeEnter: (to, from, next) => {
		const signIn = to.path === '/sign-in';
		const redirect = () => {
			if (store.state.admin.token) {
				if (signIn) {
					next('/dashboard');
				} else {
					next();
				}
			} else {
				if (signIn) {
					next();
				} else {
					next('/');
				}
			}
		};
		if (store.state.admin.refreshing) {
			store.watch(
				(state, getters) => getters['admin/isRefreshing'],
				redirect,
			);
		} else {
			redirect();
		}
	},
};

const routes = [
	{ path: '/', component: Home },
	{ path: '/sign-in', component: SignIn, ...authGuard },
	{
		path: '/dashboard',
		component: Dashboard,
		children: [
			{ path: '/', component: DashboardWelcome },
			{ path: 'addPost', component: AddPost },
			{ path: 'listPosts', component: ListPost },
		],
		...authGuard,
	},
	{ path: '/post/:id', component: Post },
	{ path: '*', component: App404 },
];

export default new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior(from, to, savedPosition) {
		return { x: 0, y: 0 };
	},
});
