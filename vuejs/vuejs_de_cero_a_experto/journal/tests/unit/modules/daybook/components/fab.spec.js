import { shallowMount } from '@vue/test-utils';

import Fab from '../../../../../src/modules/daybook/components/Fab';

describe('Fab component', () => {
  it('should show the default icon', () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find('i');
    expect(iTag.classes('fa-plus')).toBeTruthy();
  });
  it('should show the icon for the argument: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle',
      },
    });
    const iTag = wrapper.find('i');
    expect(iTag.classes('fa-circle')).toBeTruthy();
  });
  it('should emit on:click event once clicked', () => {
    const wrapper = shallowMount(Fab);
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted('on:click')).toHaveLength(1);
  });
});
