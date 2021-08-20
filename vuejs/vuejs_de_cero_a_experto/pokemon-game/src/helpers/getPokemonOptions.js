import pokemonApi from '../api/pokemonApi';

export const getPokemons = () => {
  const pokemons = Array.from(Array(650));

  return pokemons.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  return pokemons;
};

export const getPokemonNames = async (randoms = []) => {
  // const promises = [
  //   pokemonApi.get(`/${a}`),
  //   pokemonApi.get(`/${b}`),
  //   pokemonApi.get(`/${c}`),
  //   pokemonApi.get(`/${d}`),
  // ];
  const promises = randoms.map((random) => pokemonApi.get(`/${random}`));

  const pokemons = await Promise.all(promises);
  return pokemons.map((pokemon) => ({
    id: pokemon.data.id,
    name: pokemon.data.name,
  }));
  // return [
  //   { id: poke1.data.id, name: poke1.data.name },
  //   { id: poke2.data.id, name: poke2.data.name },
  //   { id: poke3.data.id, name: poke3.data.name },
  //   { id: poke4.data.id, name: poke4.data.name },
  // ];
};

export default getPokemonOptions;
