import { ref } from "vue";

export default function useCounter(initialValue = 0) {
  const counter = ref(initialValue);

  return {
    counter,
    increase: () => counter.value++,
    decrease: () => counter.value--,
  };
}
