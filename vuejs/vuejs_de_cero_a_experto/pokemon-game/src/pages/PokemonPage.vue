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
    },
  },
  mounted() {
    this.mixPokemons();
  },
};
</script>

<style>
ul {
  list-style-type: none;
}
li {
  background-color: White;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
