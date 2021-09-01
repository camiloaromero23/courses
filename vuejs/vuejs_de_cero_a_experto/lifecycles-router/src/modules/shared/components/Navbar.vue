<template>
  <div>
    <!--<router-link :to="{ name: 'home' }">Pokemon List</router-link>
    <router-link :to="{ name: 'pokemonId', params: { id: 1 } }"
      >Pokemon by id
    </router-link>
    <router-link :to="{ name: 'about' }">About</router-link>-->
    <CustomLink v-for="link in links" :key="link.to" :link="link" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  data() {
    return {
      links: [
        { to: 'pokemonHome', name: 'Pokemons' },
        { to: 'pokemonId', name: 'By ID', id: 100 },
        { to: 'pokemonAbout', name: 'About' },
        { to: 'dbzCharacters', name: 'Characters' },
        { to: 'dbzAbout', name: 'DBZ-About' },
        { to: 'https://google.com', name: 'Google' },
      ],
    };
  },
  components: {
    CustomLink: defineAsyncComponent(() => import('./CustomLink')),
  },
};
</script>

<style scoped>
div {
  padding: 0 30px;
}

div a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
</style>
