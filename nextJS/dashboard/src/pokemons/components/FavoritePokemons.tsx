"use client";

import { useAppSelector } from "@/store";
import { IoHeartOutline } from "react-icons/io5";
import { PokemonGrid } from "./PokemonGrid";

export const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.pokemons.favorites),
  );

  return (
    <>
      {favoritePokemons.length ? (
        <PokemonGrid pokemons={favoritePokemons} />
      ) : (
        <NoFavoritePokemons />
      )}
    </>
  );
};

export const NoFavoritePokemons = () => (
  <div className="flex flex-col h-[50vh] items-center justify-center">
    <IoHeartOutline size={100} className="text-red-500" />
    <span>No favorites</span>
  </div>
);
