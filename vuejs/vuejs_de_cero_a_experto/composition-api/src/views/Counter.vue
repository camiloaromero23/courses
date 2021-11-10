<template>
  <h1>Counter view</h1>
  <h3>{{ counter }}</h3>
  <button @click="decrease">-</button>
  <button @click="increase">+</button>
</template>

<script>
import useCounter from "@/composables/useCounter";

export default {
  name: "Counter",
  props: {},
  emits: [],
  setup() {
    const { counter, increase, decrease } = useCounter(30);

    return {
      counter,
      increase,
      decrease,
    };
  },
};
</script>

<style></style>
