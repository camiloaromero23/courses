import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";

export const metadata = {
  title: "Pokemons list",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}

const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<SimplePokemon[]> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );

  const data: PokemonsResponse = await res.json();

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }));

  // throw new Error("Not implemented");
  // throw notFound();

  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(150);

  return (
    <div className="flex flex-col p-2">
      <span className="text-5xl my-2">
        Pokemons list <small className="text-blue-500">static</small>
      </span>

      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
