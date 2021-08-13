<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p data-testid="counter">{{ counter }}</p>
  <div>
    <button @click="increaseCounter">+</button>
    <button @click="decreaseCounter">-</button>
    <button @click="resetCounter">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    title: String,
    start: {
      type: Number,
      default: 0,
      /* required: true, */
      validator(value) {
        return value >= 0;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    increaseCounter() {
      this.counter += 1;
    },
    decreaseCounter() {
      this.counter -= 1;
    },
    resetCounter() {
      this.counter = 0;
    },
    /* getSquareValue() { */
    /*   return this.counter * this.counter; */
    /* }, */
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
    customTitle() {
      return this.title || 'Counter';
    },
  },
};
</script>

<style>
button {
  background-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #5aa67b;
  transition: 0.3s;
}
</style>
