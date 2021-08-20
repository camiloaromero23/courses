import { shallowMount } from '@vue/test-utils';
import PokemonPicture from '@/components/PokemonPicture';

describe('PokemonPicture component', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should show the hid image and pokemon 100', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });
    const url =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg';
    const [img1, img2] = wrapper.findAll('img');

    expect(img1.exists()).toBeTruthy();
    expect(img2).toBeFalsy();
    expect(img1.classes('hidden-pokemon')).toBeTruthy();
    expect(img1.attributes('src')).toBe(url);
  });
  it('should show the pokemon if showPokemon:true', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });
    const img = wrapper.find('img');

    expect(img).toBeTruthy();
    expect(img.classes('fade-in')).toBeTruthy();
  });
});
