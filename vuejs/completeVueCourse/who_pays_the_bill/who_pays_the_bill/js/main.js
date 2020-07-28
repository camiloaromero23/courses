new Vue({
	el: '#app',
	data() {
		return {
			state: true,
			inputName: '',
			names: [],
			showError: false,
			loserName: '',
		};
	},
	computed: {
		log() {
			console.log('Halooo');
		},
	},
	methods: {
		addName() {
			if (this.validateName(this.inputName)) {
				this.showError = false;
				this.names = [...this.names, this.inputName];
				this.inputName = '';
			} else {
				this.showError = true;
			}
		},
		validateName(value) {
			if (value !== '') {
				return true;
			}
			return false;
		},
		checkLoser() {
			this.loserName = this.names[
				Math.floor(Math.random() * this.names.length)
			];
			this.changeAppWindow();
		},
		changeAppWindow() {
			this.state = !this.state;
		},
		resetApp() {
			this.changeAppWindow();
			this.names = [];
		},
		removeName(index) {
			this.names.splice(index, 1);
		},
	},
});
