import { shallowMount } from '@vue/test-utils';
import PokemonOptions from '@/components/PokemonOptions';

import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonOptions components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
        optionsEnabled: true,
      },
    });
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show the 4 options correctly', () => {
    const liTags = wrapper.findAll('li');

    expect(liTags.length).toBe(4);

    liTags.forEach((li, index) => {
      expect(li.text()).toBe(pokemons[index].name);
    });
  });

  it('should emit "selection" with its respective params once it is clicked', () => {
    const liTags = wrapper.findAll('li');

    liTags.forEach((li, index) => {
      li.trigger('click');
      expect(wrapper.emitted('pokemonSelected')[index]).toEqual([
        pokemons[index].id,
      ]);

      // console.log(wrapper.emitted('pokemonSelected').length);
    });
    expect(wrapper.emitted('pokemonSelected').length).toBe(4);
  });
});
