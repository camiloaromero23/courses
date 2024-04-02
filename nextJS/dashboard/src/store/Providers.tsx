"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from ".";
import { setFavoritePokemons } from "./pokemons/pokemons";

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const pokemons = localStorage.getItem("pokemons");

    if (!pokemons) {
      return;
    }

    store.dispatch(setFavoritePokemons(JSON.parse(pokemons)));
  }, []);
  return <Provider store={store}>{children}</Provider>;
};
