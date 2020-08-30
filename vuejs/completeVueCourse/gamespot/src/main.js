import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import VueResource from 'vue-resource';
import store from './store/store';
import vuelidate from 'vuelidate';
import wysiwyg from 'vue-wysiwyg';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

import AppReviewButton from './components/ReviewButton';
Vue.component('app-review-button', AppReviewButton);

// Material
Vue.use(VueMaterial);

//Resource
Vue.use(VueResource);
Vue.http.options.root = 'https://gamespot-1a5c6.firebaseio.com/';

//Misc
Vue.use(vuelidate);
Vue.use(wysiwyg);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
