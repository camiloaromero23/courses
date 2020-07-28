<template>
	<div>
		<carousel
			:perPage="1"
			:mouse-drag="true"
			:paginationEnabled="false"
			:autoplay="true"
			:autoplayTimeout="4000"
			:loop="true"
		>
			<slide v-for="(slide, index) in slides" :key="index">
				<div
					class="slider_bck"
					:style="{ background: `url(${slide.bck})` }"
				>
					<div class="container slider-container">
						<div class="text">{{ slide.text }}</div>
						<div class="image" :src="slide.img"></div>
					</div>
				</div>
			</slide>
		</carousel>
	</div>
</template>

<script>
	import { Carousel, Slide } from 'vue-carousel';
	import slideBackground from '../assets/images/slide_bck.jpg';
	import slideBackground2 from '../assets/images/slide_bck2.jpg';
	import pizzaOne from '../assets/images/pizza_one.png';
	import pizzaTwo from '../assets/images/pizza_two.png';
	import pizzaThree from '../assets/images/pizza_three.png';
	export default {
		name: 'AppFeatured',
		data() {
			return {
				slides: [
					{
						text: '20% OFF',
						bck: slideBackground,
						img: pizzaOne,
					},
					{
						text: '2X1',
						bck: slideBackground2,
						img: pizzaTwo,
					},
					{
						text: '3X1',
						bck: slideBackground2,
						img: pizzaThree,
					},
				],
			};
		},
		components: {
			Carousel,
			Slide,
		},
	};
</script>

<style scoped></style>
