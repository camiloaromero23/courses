import NavBar from '@/modules/daybook/components/NavBar.vue';
import { shallowMount } from '@vue/test-utils';
import createVuexStore from '../../../../mock-data/mock-store';

describe('Navbar component tests', () => {
  const store = createVuexStore({
    user: {
      name: 'Test',
      email: 'test@test.com',
    },
    status: 'authenticated',
    idToken: 'ABC',
    refreshToken: 'XYZ',
  });

  beforeEach(() => jest.clearAllMocks());

  it('should show the component correctly', async () => {
    const wrapper = shallowMount(NavBar, { global: { plugins: [store] } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should logout and redirect by clicking in logout button', async () => {
    const wrapper = shallowMount(NavBar, { global: { plugins: [store] } });

    await wrapper.find('button').trigger('click');

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: 'login' });

    expect(store.state.auth).toEqual({
      user: null,
      status: 'not-authenticated',
      idToken: null,
      refreshToken: null,
    });
  });
});
