import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    todos: [
      { id: "1", text: "Collect infinity stones", completed: false },
      { id: "2", text: "Soul stone", completed: false },
      { id: "3", text: "Power stone", completed: true },
      { id: "4", text: "Reality stone", completed: false },
      { id: "5", text: "Find new qualified minions", completed: true },
    ],
  },
  mutations: {
    toggleTodo(state, id) {
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
    },
    createTodo(state, text = "") {
      if (text.length <= 1) {
        return;
      }
      state.todos.push({
        id: uuidv4(),
        completed: false,
        text,
      });
    },
  },
  actions: {},
  modules: {},
  getters: {
    allTodos(state) {
      return state.todos;
    },
    completedTodos(state) {
      return state.todos.filter((t) => t.completed);
    },
    pendingTodos(state) {
      return state.todos.filter((t) => !t.completed);
    },
    getTodosByTab: (_, getters) => (tab) => {
      const options = {
        all: getters.allTodos,
        done: getters.completedTodos,
        pending: getters.pendingTodos,
      };

      return options[tab];
    },
  },
});
