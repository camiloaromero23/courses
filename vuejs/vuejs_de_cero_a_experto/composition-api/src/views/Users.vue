<template>
  <h2 v-if="isLoading">Please wait...</h2>
  <h2 v-else>Users</h2>
  <h5 v-if="errorMessage">{{ errorMessage }}</h5>
  <div v-if="users.length > 0">
    <UserList :users="users" v-slot="{ user }">
      <h5>{{ user.first_name }} {{ user.last_name }}</h5>
      <span>{{ user.email }}</span>
    </UserList>
  </div>
  <button @click="prevPage">Previous</button>
  <button @click="nextPage">Next</button>
  <span> Page: {{ currentPage }}</span>
</template>

<script>
import useUsers from "@/composables/useUsers";
import UserList from "@/components/UserList.vue";

export default {
  components: {
    UserList,
  },
  setup() {
    const { currentPage, errorMessage, isLoading, nextPage, prevPage, users } =
      useUsers();

    return {
      currentPage,
      errorMessage,
      isLoading,
      users,
      nextPage,
      prevPage,
    };
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  width: 100%;
}
div {
  display: flex;
  justify-content: center;
  text-align: center;
}
ul {
  width: 250px;
}
</style>
