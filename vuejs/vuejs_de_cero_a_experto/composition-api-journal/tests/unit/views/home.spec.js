import { shallowMount } from '@vue/test-utils';
import Home from '../../../src/views/Home';

describe('About view', () => {
  it('should match the snapshot', async () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should redirect once a button is clicked', () => {
    const routerMock = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: routerMock,
        },
      },
    });
    wrapper.find('button').trigger('click');
    expect(routerMock.push).toHaveBeenCalled();
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'noEntry' });
  });
});
