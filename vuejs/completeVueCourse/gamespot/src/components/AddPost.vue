<template>
	<div class="dashboard_form">
		<h1>Add Post</h1>
		<form @submit.prevent="submitHandler">
			<div v-if="imageUpload">
				<img :src="imageUpload" alt="" />
			</div>
			<div class="input_field">
				<input
					type="file"
					@change="processImage($event)"
					ref="imageInput"
				/>
			</div>
			<div
				class="input_field"
				:class="{ invalid: $v.formData.title.$error }"
			>
				<label>
					Title
					<input
						type="text"
						v-model="formData.title"
						@blur="$v.formData.title.$touch()"
					/>
				</label>
				<p class="error_label" v-if="$v.formData.title.$error">
					This field is required
				</p>
			</div>
			<div
				class="input_field"
				:class="{ invalid: $v.formData.description.$error }"
			>
				<label>
					Description
					<input
						type="text"
						v-model="formData.description"
						@blur="$v.formData.description.$touch()"
					/>
				</label>
				<p class="error_label" v-if="$v.formData.description.$error">
					This field is required
				</p>
				<p
					class="error_label"
					v-if="!$v.formData.description.maxLength"
				>
					Must not be greater than
					{{ $v.formData.description.$params.maxLength.max }}
					characters
				</p>
			</div>

			<div class="input_field">
				<wysiwyg v-model="formData.content" />
			</div>

			<div
				class="input_field"
				:class="{ invalid: $v.formData.rating.$error }"
			>
				<label>
					Rating
					<select
						@blur="$v.formData.rating.$touch()"
						v-model="formData.rating"
					>
						<option v-for="item in 5" :key="item">
							{{ item }}
						</option>
					</select>
				</label>
				<p class="error_label" v-if="$v.formData.rating.$error">
					Select a rating
				</p>
			</div>
			<button type="submit">Add post</button>
		</form>
		<md-dialog :md-active="dialog">
			<p>Post empty, are you sure?</p>
			<md-dialog-actions>
				<md-button @click="cancelDialog" class="md-primary">
					No
				</md-button>
				<md-button @click="confirmDialog" class="md-primary">
					Yes
				</md-button>
			</md-dialog-actions>
		</md-dialog>
		<div v-if="addPostStatus" class="post_succesfull">
			Success!
		</div>
	</div>
</template>

<script>
	import { required, maxLength } from 'vuelidate/lib/validators';
	export default {
		name: 'AppAddPost',
		data() {
			return {
				dialog: false,
				formData: {
					title: '',
					description: '',
					content: '',
					rating: '',
					image: this.imageUpload,
				},
			};
		},
		validations: {
			formData: {
				title: { required },
				description: { required, maxLength: maxLength(100) },
				rating: { required },
			},
		},
		methods: {
			submitHandler() {
				if (!this.$v.$invalid) {
					if (this.formData.content === '') {
						this.dialog = true;
					} else {
						this.addPost();
					}
				} else {
					console.log('Error');
				}
			},
			addPost() {
				const image = this.imageUpload;
				const data = { ...this.formData, image };
				this.$store.dispatch('admin/addPost', data);
			},
			cancelDialog() {
				this.dialog = false;
			},
			confirmDialog() {
				this.dialog = false;
				this.addPost();
			},
			clearPost() {
				this.$v.$reset();
				this.formData = {
					title: '',
					description: '',
					content: '',
					rating: '',
					image: '',
				};
			},
			processImage(event) {
				let file = event.target.files[0];
				this.$store.dispatch('admin/imageUpload', file);
			},
		},
		computed: {
			addPostStatus() {
				let status = this.$store.getters['admin/addPostStatus'];
				if (status) {
					this.clearPost();
					this.$store.commit('admin/clearImageUpload');
				}
				return status;
			},
			imageUpload() {
				return this.$store.getters['admin/imageUpload'];
			},
		},
		destroyed() {
			this.$store.commit('admin/clearImageUpload');
		},
	};
</script>

<style scoped>
	@import '~vue-wysiwyg/dist/vueWysiwyg.css';
	.input_field.invalid input,
	.input_field.invalid select {
		border: 1px solid red;
	}
</style>
