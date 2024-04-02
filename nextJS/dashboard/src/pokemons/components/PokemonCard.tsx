"use client";

import Link from "next/link";
import { SimplePokemon } from "../interfaces/simplePokemon";
import Image from "next/image";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/pokemons/pokemons";

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const isFavorite = useAppSelector((state) => !!state.pokemons.favorites[pokemon.id]);

  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(pokemon));
  };

  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            key={pokemon.id}
            alt={pokemon.name}
            width={100}
            height={100}
          />
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {pokemon.name}
          </p>
          <div className="mt-5">
            <Link
              href={`/dashboard/pokemon/${pokemon.name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              More info
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div
            onClick={handleToggleFavorite}
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          >
            <div className="text-green-600">
              {isFavorite ? (
                <IoHeart className="text-red-600" />
              ) : (
                <IoHeartOutline className="text-red-600" />
              )}
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {isFavorite ? "Favorite" : "Not Favorite"}
              </p>
              <p className="text-xs text-gray-500">Click to change</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
