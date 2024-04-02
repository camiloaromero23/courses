import { Middleware, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { PokemonsState, toggleFavorite } from "../pokemons/pokemons";

interface State {
  pokemons: PokemonsState;
}

export const localStorageMiddleware: Middleware<
  {},
  State,
  ThunkDispatch<State, unknown, UnknownAction>
> =
  ({ getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (toggleFavorite.match(action)) {
      const pokemons = getState().pokemons.favorites;
      localStorage.setItem("pokemons", JSON.stringify(pokemons));

      return;
    }
  };
