import { shallowMount } from '@vue/test-utils';
import About from '../../../src/views/About';

describe('About view', () => {
  it('should match the snapshot', async () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
