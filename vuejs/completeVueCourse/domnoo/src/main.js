import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueScrollReveal from 'vue-scroll-reveal';

import { MdButton, MdDrawer, MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueResource);

Vue.use(MdButton);
Vue.use(MdDrawer);
Vue.use(MdCard);

Vue.use(VueScrollReveal, {
	duration: 800,
	scale: 1,
	distance: '50px',
});

Vue.http.options.root = 'https://domnoo-bee8c.firebaseio.com/';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
