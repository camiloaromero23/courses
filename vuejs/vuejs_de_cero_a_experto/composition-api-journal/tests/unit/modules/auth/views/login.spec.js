import { shallowMount } from '@vue/test-utils';
import Login from '@/modules/auth/views/Login.vue';
import createVuexStore from '../../../../mock-data/mock-store';

import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Login Component tests', () => {
  const store = createVuexStore({
    status: 'not-authenticated',
    user: null,
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('should match the snapshot', () => {
    const wrapper = shallowMount(Login, { global: { plugins: [store] } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not authenticate with incorrect credentials', async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: 'Invalid credentials',
    });

    const wrapper = shallowMount(Login, { global: { plugins: [store] } });
    await wrapper.find('form').trigger('submit');

    const emptyUser = {
      email: '',
      password: '',
    };
    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', emptyUser);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Invalid credentials',
      'error',
    );
  });

  it('should authenticate & redirect to no-entry route with correct credentials', async () => {
    store.dispatch.mockReturnValueOnce({
      ok: true,
    });

    const wrapper = shallowMount(Login, { global: { plugins: [store] } });

    const [email, password] = wrapper.findAll('input');
    await email.setValue('test@test.com');
    await password.setValue('123456');
    await wrapper.find('form').trigger('submit');

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: 'test@test.com',
      password: '123456',
    });
    expect(wrapper.router.push).toHaveBeenCalledWith({ name: 'noEntry' });
  });
});
