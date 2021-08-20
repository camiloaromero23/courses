import { shallowMount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage Component', () => {
  let wrapper;
  let loadedWrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
    loadedWrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showResult: false,
          message: '',
          selectedPokemon: null,
        };
      },
    });
  });
  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call mixPokemonArray once mounted', () => {
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemons');
    shallowMount(PokemonPage);
    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  it('should match snapshot when pokemons are loaded', () => {
    loadedWrapper;
    expect(loadedWrapper.html()).toMatchSnapshot();
  });

  it('should show PokemonPicture & PokemonOptions components', () => {
    const PokemonPicture = loadedWrapper.find('pokemon-picture-stub');
    const PokemonOptions = loadedWrapper.find('pokemon-options-stub');

    expect(PokemonPicture.exists()).toBeTruthy();
    expect(PokemonOptions.exists()).toBeTruthy();

    expect(PokemonPicture.attributes('pokemonid')).toBe('1');
    expect(PokemonOptions.attributes('pokemons')).toBeTruthy();
  });

  it('should update checkAnswer', async () => {
    await loadedWrapper.vm.checkAnswer(1);
    const h2Tag = loadedWrapper.find('h2');

    expect(h2Tag.exists()).toBeTruthy();
    expect(h2Tag.text()).toBe(`Correct! ${pokemons[0].name}`);
    expect(loadedWrapper.vm.showPokemon).toBeTruthy();
    await loadedWrapper.vm.checkAnswer(11);
    expect(loadedWrapper.vm.message).toBe(
      `Whoops! The right one was ${pokemons[0].name}`,
    );
  });
});
