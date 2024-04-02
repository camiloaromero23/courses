import { FavoritePokemons } from "@/pokemons";

export const metadata = {
  title: "Favorites",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col p-2">
      <span className="text-5xl my-2">
        Favorites Pokemons <small className="text-blue-500">Global State</small>
      </span>

      <FavoritePokemons />
    </div>
  );
}
