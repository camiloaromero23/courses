<template>
  <a
    v-if="isExternalLink"
    :href="link.to"
    target="_blank"
    class="normal-link"
    >{{ link.name }}</a
  >
  <router-link v-else :to="route" v-slot="{ isActive }">
    <a :class="isActive ? 'is-active' : 'normal-link'">
      {{ link.name }}
    </a>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isExternalLink() {
      return this.link.to.startsWith('http');
    },
    route() {
      const { to: name, id } = this.link;
      return id ? { name, params: { id } } : { name };
    },
  },
};
</script>

<style scoped>
.is-active {
  color: #42b983;
}

.normal-link {
  color: #c6c5c5;
}
</style>
