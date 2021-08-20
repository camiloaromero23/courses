<template>
  <h1>Who's that pokémon?</h1>
  <h1 v-if="!pokemon">Please wait...</h1>
  <div v-else>
    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    ></PokemonPicture>
    <PokemonOptions
      :optionsDisabled="!showResult"
      :pokemons="pokemons"
      :pokemonId="pokemon.id"
      :selectedPokemon="selectedPokemon"
      @pokemonSelected="checkAnswer"
    ></PokemonOptions>
    <template v-if="showResult">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '../components/PokemonPicture';
import PokemonOptions from '../components/PokemonOptions';
import getPokemonOptions from '../helpers/getPokemonOptions';

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemons: [],
      pokemon: null,
      showPokemon: false,
      showResult: false,
      message: '',
      selectedPokemon: null,
    };
  },
  methods: {
    async mixPokemons() {
      this.pokemons = await getPokemonOptions();
      const randomInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemons[randomInt];
    },
    toggleImage() {
      this.showPokemon = !this.showPokemon;
    },
    toggleShowResult() {
      this.showResult = !this.showResult;
    },
    checkAnswer(pokemonId) {
      this.toggleImage();
      if (pokemonId === this.pokemon.id) {
        this.message = 'Correct! ';
      } else {
        this.message = 'Whoops! The right one was ';
        this.selectedPokemon = pokemonId;
      }
      this.message += this.pokemon.name;
      this.toggleShowResult();
    },
    newGame() {
      this.toggleShowResult();
      this.toggleImage();
      this.mixPokemons();
      this.pokemons = [];
      this.pokemon = null;
      this.selectedPokemon = null;
    },
  },
  mounted() {
    this.mixPokemons();
  },
};
</script>
