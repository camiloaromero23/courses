<template>
  <h1>Counter - Vuex</h1>
  <h2>Direct access: {{ $store.state.counter.count }}</h2>
  <h2>Computed: {{ computedCount }}</h2>

  <button @click="increase">+1</button>
  <button @click="increaseBy5">+5</button>
  <button @click="randomIncrease" :disabled="loading">Random</button>

  <h1>mapState counter: {{ count }}</h1>
  <h1>mapState mutation: {{ lastMutation }}</h1>

  <h2>Direct getter: {{ $store.getters["counter/squaredCount"] }}</h2>
  <h2>mapGetters squaredCount: {{ squaredCount }}</h2>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    computedCount() {
      return this.$store.state.counter.count;
    },
    /* ...mapState('counter',["count", "lastMutation", "loading"]) */
    ...mapState("counter", {
      count: state => state.count,
      lastMutation: state => state.lastMutation,
      loading: state => state.loading
      /* loading: "loading", */
      /* lastMutation: "lastMutation" */
    }),
    ...mapGetters("counter", {
      squaredCount: "squaredCount"
    })
  },
  methods: {
    increase() {
      this.$store.commit("counter/increase");
    },
    increaseBy5() {
      this.$store.commit("counter/increaseBy", 5);
      /* this.randomIncrease(); // Can also dispatch an action this way */
    },
    /* ...mapActions("counter", ["increaseByRandomInt"]) */
    ...mapActions("counter", {
      randomIncrease: "increaseByRandomInt"
    })
  }
};
</script>
