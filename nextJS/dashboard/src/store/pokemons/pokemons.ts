import { SimplePokemon } from "@/pokemons";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PokemonsState {
  favorites: {
    [key: string]: SimplePokemon;
  };
}

// const getInitialState = (): PokemonsState => {
//   // if (typeof localStorage === "undefined") return {}; // WARN: Messes with hydration

//   const pokemons = localStorage.getItem("pokemons");

//   return pokemons ? JSON.parse(pokemons) : {};
// };

const initialState: PokemonsState = {
  favorites: {}
  // ...getInitialState(),
  // "1": { id: "1", name: "bulbasaur" },
  // "3": { id: "3", name: "venusaur" },
  // "5": { id: "5", name: "charmeleon" },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setFavoritePokemons(state, action: PayloadAction<typeof initialState.favorites>) {
      state.favorites = action.payload;
    },

    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;

      if (!!state.favorites[pokemon.id]) {
        delete state.favorites[pokemon.id];
      } else {
        state.favorites[pokemon.id] = pokemon;
      }
    },
  },
});

export const { toggleFavorite, setFavoritePokemons } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
