<template>
  <div class="home">
    <h1>Reactive vs Ref</h1>
    <h3>{{ ironMan }}</h3>
    <h3>{{ hulk }}</h3>
    <button @click="changeIronMan">Change IronMan</button>
    <button @click="changeHulk">Change Hulk</button>

    <h3>IronMan: {{ ironManIsAlive }}</h3>
    <h3>Hulk: {{ hulkIsAlive }}</h3>
    <button @click="changeStatus">Change Status</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "Home",
  setup() {
    const ironMan = ref({ name: "Tony", age: 50 });
    const hulk = reactive({ name: "Bruce", age: 50 });
    const ironManIsAlive = reactive(false);
    const hulkIsAlive = ref(true);

    const changeStatus = () => {
      hulkIsAlive.value = !hulkIsAlive.value;
      // ironManIsAlive - !ironManIsAlive;
    };

    return {
      ironMan,
      hulk,
      changeIronMan: () => {
        ironMan.value.name = "Tony Stark";
        ironMan.value.age = 55;
      },
      changeHulk: () => {
        hulk.name = "Bruce Banner";
        hulk.age = 45;
      },
      ironManIsAlive,
      hulkIsAlive,
      changeStatus,
    };
  },
};
</script>
