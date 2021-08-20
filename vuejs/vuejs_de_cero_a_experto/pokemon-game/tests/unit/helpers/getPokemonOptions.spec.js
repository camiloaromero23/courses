import { getPokemons, getPokemonNames } from '@/helpers/getPokemonOptions';
import getPokemonOptions from '@/helpers/getPokemonOptions';
describe('getPokemonOptions helpers', () => {
  let pokemons;

  beforeEach(() => {
    pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
      { id: 4, name: 'charmander' },
    ];
  });

  test('should return an array of pokemons', () => {
    const obtainedPokemons = getPokemons();

    expect(obtainedPokemons.length).toBe(650);
    expect(obtainedPokemons[0]).toBe(1);
    expect(obtainedPokemons[500]).toBe(501);
    expect(obtainedPokemons[649]).toBe(650);
  });

  test('should return an array of 4 elements with pokemon names', async () => {
    const obtainedPokemons = await getPokemonNames([1, 2, 3, 4]);
    expect(obtainedPokemons).toStrictEqual(pokemons);
  });

  test('should return a mixed array', async () => {
    const obtainedPokemons = await getPokemonOptions();
    expect(obtainedPokemons.length).toBe(4);
    expect(obtainedPokemons).toEqual([
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
    ]);
  });
});
