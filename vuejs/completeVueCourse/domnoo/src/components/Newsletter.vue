<template>
	<div class="container newsl_container">
		<h2>Join to our newsletter</h2>
		<div class="form">
			<input type="text" name="" id="" v-model="email" />
			<button @click="submitHandler">Subscribe</button>
		</div>
		<div class="error_label">
			<div>{{ error }}</div>
		</div>
		<div class="success_label">
			<div>{{ success }}</div>
		</div>
		<div class="small">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Consequuntur error explicabo inventore iusto reiciendis
				repellendus suscipit, voluptates? Ab accusantium culpa eligendi
				exercitationem magnam maiores maxime molestiae, nemo odio
				quibusdam sint?
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AppNewsletter',
		data() {
			return {
				email: '',
				error: '',
				success: '',
			};
		},
		methods: {
			validate(email) {
				let valid = [true, ''];
				if (email === '') {
					valid = [false, 'Its empty'];
				}
				const emailRegex = /\S+@\S+\.\S+/;
				if (!emailRegex.test(email)) {
					valid = [false, 'Not valid email'];
				}
				return valid;
			},
			submitHandler() {
				const valid = this.validate(this.email);
				if (valid[0]) {
					this.error = '';
					this.addEmail(this.email);
				} else {
					this.error = valid[1];
				}
			},
			addEmail(email) {
				this.$http
					.get(`users.json?orderBy="email"&&equalTo="${email}"`)
					.then(response => {
						if (
							Object.getOwnPropertyNames(response.data).length ===
							0
						) {
							this.$http
								.post(`users.json`, {
									email: this.email,
								})
								.then(response => {
									response.json();
									this.success = 'Thank you for subscribing';
								});
						} else {
							this.success = 'User already subscribed';
						}
						this.clearSuccess();
					});
			},
			clearSuccess() {
				setTimeout(() => {
					this.email = '';
					this.success = '';
				}, 3000);
			},
		},
	};
</script>

<style scoped></style>
