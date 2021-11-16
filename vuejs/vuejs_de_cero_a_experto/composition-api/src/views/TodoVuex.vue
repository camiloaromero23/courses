<template>
  <h1>Thanos' todo list</h1>
  <h4>Pending: {{ pending.length }}</h4>
  <hr />
  <button :class="{ active: currentTab === 'all' }" @click="currentTab = 'all'">
    All
  </button>
  <button
    :class="{ active: currentTab === 'pending' }"
    @click="currentTab = 'pending'"
  >
    Pending
  </button>
  <button
    :class="{ active: currentTab === 'done' }"
    @click="currentTab = 'done'"
  >
    Done
  </button>

  <div>
    <ul>
      <li
        v-for="todo in getTodosByTab"
        :key="todo.id"
        :class="{ completed: todo.completed }"
        @dblclick="toggleTodo(todo.id)"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>

  <button @click="openModal">Create Todo</button>

  <Modal v-if="isOpen" @on:close="closeModal">
    <template v-slot:header>
      <h1>New Todo</h1>
    </template>
    <template v-slot:body>
      <form
        @submit.prevent="
          createTodo(newTodoText);
          closeModal();
        "
      >
        <input type="text" placeholder="New ToDo" v-model="newTodoText" />
        <br />
        <button type="submit">Create Todo</button>
      </form>
    </template>
    <!-- <template v-slot:footer> -->
    <!--   <button>Create Todo</button> -->
    <!-- </template> -->
  </Modal>
</template>

<script>
import useTodos from "@/composables/useTodos";
import useModal from "@/composables/useModal";
import Modal from "../components/Modal.vue";
import { ref } from "vue";

export default {
  components: { Modal },
  setup() {
    const { currentTab, pending, getTodosByTab, toggleTodo, createTodo } =
      useTodos();
    const { isOpen, openModal, closeModal } = useModal();

    return {
      currentTab,
      pending,
      getTodosByTab,
      toggleTodo,
      isOpen,
      openModal,
      closeModal,
      newTodoText: ref(""),
      createTodo,
    };
  },
};
// import { useStore } from "vuex";
// import { computed, ref } from "vue";
// export default {
//   setup() {
//     const store = useStore();

//     const currentTab = ref("all");

//     return {
//       currentTab,
//       all: computed(() => store.getters["allTodos"]),
//       completed: computed(() => store.getters["completedTodos"]),
//       pending: computed(() => store.getters["pendingTodos"]),
//       getTodosByTab: computed(() =>
//         store.getters["getTodosByTab"](currentTab.value)
//       ),
//       toggleTodo: (id) => {
//         store.commit("toggleTodo", id);
//       },
//     };
//   },
// };
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  text-align: center;
}

li {
  cursor: pointer;
}

.active {
  background-color: #2c3e50;
  color: White;
}

.completed {
  text-decoration: line-through;
}
</style>
