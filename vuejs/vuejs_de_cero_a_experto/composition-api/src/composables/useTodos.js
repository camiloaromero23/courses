import { useStore } from "vuex";
import { computed, ref } from "vue";

const useTodos = () => {
  const store = useStore();

  const currentTab = ref("all");

  return {
    currentTab,
    pending: computed(() => store.getters["pendingTodos"]),
    getTodosByTab: computed(() =>
      store.getters["getTodosByTab"](currentTab.value)
    ),
    toggleTodo: (id) => {
      store.commit("toggleTodo", id);
    },
    createTodo: (text) => {
      store.commit("createTodo", text);
    },
  };
};

export default useTodos;
