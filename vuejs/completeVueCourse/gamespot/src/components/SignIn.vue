<template>
	<div class="container">
		<div class="signin_container">
			<h1>Sign in</h1>
			<form @submit.prevent="handleSubmit">
				<div
					class="input_field"
					:class="{ invalid: $v.formData.email.$error }"
				>
					<label>
						Email
						<input
							type="email"
							v-model.trim="formData.email"
							@blur="$v.formData.email.$touch()"
						/>
						<div v-if="$v.formData.email.$error">
							<p
								class="error_label"
								v-if="!$v.formData.email.required"
							>
								This field is required
							</p>
							<p
								class="error_label"
								v-if="!$v.formData.email.email"
							>
								Enter a valid email
							</p>
						</div>
					</label>
				</div>
				<div
					class="input_field"
					:class="{ invalid: $v.formData.email.$error }"
				>
					<label>
						Password
						<input
							type="password"
							v-model="formData.password"
							@blur="$v.formData.password.$touch()"
						/>
						<p
							class="error_label"
							v-if="!$v.formData.password.required"
						>
							This field is required
						</p>
						<p
							class="error_label"
							v-if="!$v.formData.password.minLength"
						>
							At least 4 characters
						</p>
					</label>
				</div>
				<button type="submit">Sign in</button>
				<p class="error_label" v-if="error">
					Something is wrong
				</p>
				<p class="error_label" v-if="authFailed">
					Check your email or password
				</p>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, email, minLength } from 'vuelidate/lib/validators';
	export default {
		name: 'AppSignIn',
		methods: {
			handleSubmit() {
				if (!this.$v.$invalid) {
					this.$store.dispatch('admin/signIn', this.formData);
				} else {
					this.error = true;
					setTimeout(() => {
						this.error = false;
					}, 3000);
				}
			},
		},
		data() {
			return {
				error: false,
				formData: {
					email: 'sample@gmail.com',
					password: 'sample',
				},
			};
		},
		validations: {
			formData: {
				email: {
					required,
					email,
				},
				password: {
					required,
					minLength: minLength(4),
				},
			},
		},
		computed: {
			authFailed() {
				return this.$store.state.admin.authFailed;
			},
			destroyed() {
				return this.$store.commit('admin/authFailed', 'reset');
			},
		},
	};
</script>

<style scoped>
	.input_field.invalid input,
	.input_field.invalid select {
		border: 1px solid red;
	}
</style>
