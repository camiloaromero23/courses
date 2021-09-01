<template>
  <h1>Pokemon #{{ id }}</h1>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null,
    };
  },
  created() {
    /* console.log(this.$route.params.id); */
    /* this.id = +this.$route.params.id; */
    this.getPokemon();
  },
  watch: {
    id() {
      this.getPokemon();
    },
  },
  methods: {
    async getPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const pokemon = await res.json();
        this.pokemon = pokemon;
        console.log(pokemon);
      } catch (error) {
        this.$router.push('/');
        console.log('Nothing left to do here.');
      }
    },
  },
};
</script>
