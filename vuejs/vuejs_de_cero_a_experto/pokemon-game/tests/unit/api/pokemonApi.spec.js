import pokemonApi from '@/api/pokemonApi';
describe('Pokemon Api', () => {
  test('should have axios correctly configured', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    expect(pokemonApi.defaults.baseURL).toBe(url);
  });
});
