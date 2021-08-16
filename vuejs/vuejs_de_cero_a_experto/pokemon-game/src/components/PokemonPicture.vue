<template>
  <div class="pokemon-container">
    <img v-if="showPokemon" :src="imgSrc" class="fade-in" alt="pokemon" />
    <img v-else :src="imgSrc" class="hidden-pokemon fade-in" alt="pokemon" />
  </div>
</template>

<script>
export default {
  name: 'PokemonPicture',
  computed: {
    imgSrc() {
      /* `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonid}.svg` */
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
  props: {
    pokemonId: {
      required: true,
      type: Number,
    },
    showPokemon: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>
