<template>
  <div class="options-container">
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :disabled="optionsEnabled ? true : false"
        @click="hasAnswer(pokemon.id)"
        :class="{
          disabled: !optionsEnabled,
          'correct-pokemon': pokemonId === pokemon.id && !optionsEnabled,
          'wrong-pokemon':
            pokemonId !== selectedPokemon &&
            pokemon.id === selectedPokemon &&
            !optionsEnabled,
        }"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PokemonOptions',
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    optionsEnabled: {
      type: Boolean,
      required: true,
    },
    pokemonId: {
      type: Number,
    },
    selectedPokemon: {
      type: Number,
    },
  },
  methods: {
    hasAnswer(pokemonId) {
      if (this.optionsEnabled) {
        this.$emit('pokemonSelected', pokemonId);
      }
    },
  },
};
</script>

<style scoped>
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

.disabled:hover {
  cursor: not-allowed;
  background-color: White;
}

.correct-pokemon {
  border: 0.15rem solid Green;
}

.wrong-pokemon {
  border: 0.15rem solid Red;
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
