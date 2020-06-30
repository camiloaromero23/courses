<template>
  <div id="app">
    <AddToDo @add-todo="addToDo" />
    <Todos :todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>
<script>
import Todos from '../components/Todos';

import AddToDo from '../components/AddToDo';

export default {
  name: 'Home',
  components: { Todos, AddToDo },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    deleteTodo(id) {
      const requestOptions = {
        method: 'delete',
        headers: {
          'Content-type': 'application/json', // Indicates the content
        },
      };
      fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        requestOptions,
      ).then(response => response.json());
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    addToDo(newToDo) {
      // const { title, completed } = newToDo;
      const requestOptions = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newToDo),
      };
      fetch('https://jsonplaceholder.typicode.com/todos', requestOptions)
        .then(response => response.json())
        .then(data => (this.todos = [...this.todos, data]))
        .catch(error => console.log(error));
      console.log('todos', this.todos);
    },
  },
  created() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(data => (this.todos = data))
      .catch(error => console.log(error));
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: white;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
