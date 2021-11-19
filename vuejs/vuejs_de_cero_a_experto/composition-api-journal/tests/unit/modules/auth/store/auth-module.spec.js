import createVuexStore from '../../../../mock-data/mock-store';
import authApi from '@/api/authApi';

describe('Auth module Vuex tests', () => {
  it('should initialize the state correctly', () => {
    const store = createVuexStore({
      status: 'authenticating',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe('authenticating');
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  //Mutations
  it('should commit loginUser mutation', () => {
    const store = createVuexStore({
      status: 'authenticating',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const payload = {
      user: { name: 'Test2', email: 'test2@test.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123',
    };

    store.commit('auth/loginUser', payload);

    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe('authenticated');
    expect(user).toEqual({ name: 'Test2', email: 'test2@test.com' });
    expect(idToken).toBe('ABC-123');
    expect(refreshToken).toBe('XYZ-123');
  });

  it('should commit loginUser mutation', () => {
    localStorage.setItem('idToken', 'ABC-123');
    localStorage.setItem('refreshToken', 'XYZ-123');
    const store = createVuexStore({
      status: 'authenticated',
      user: { name: 'Test2', email: 'test2@test.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123',
    });

    store.commit('auth/logout');

    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe('not-authenticated');
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();

    expect(localStorage.getItem('idToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  //Getters
  it('should obtain username & currentState', () => {
    const store = createVuexStore({
      status: 'authenticated',
      user: { name: 'Test2', email: 'test2@test.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123',
    });

    const currentState = store.getters['auth/currentState'];
    const username = store.getters['auth/username'];

    expect(currentState).toBe('authenticated');
    expect(username).toBe('Test2');
  });

  //Actions
  it('should dispatch createUser action & throw user exists error', async () => {
    const store = createVuexStore({
      status: 'not-authenticated',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    };

    const res = await store.dispatch('auth/createUser', newUser);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('not-authenticated');
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
    expect(res).toEqual({ ok: false, message: 'EMAIL_EXISTS' });
  });

  it('should dispatch signInUser & createUser actions', async () => {
    const store = createVuexStore({
      status: 'not-authenticated',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: 'Test',
      email: 'test2@test.com',
      password: '123456',
    };

    await store.dispatch('auth/signInUser', newUser);
    const { idToken } = store.state.auth;

    await authApi.post(':delete', { idToken });

    newUser.password = '123456';
    const createRes = await store.dispatch('auth/createUser', newUser);

    expect(createRes.ok).toBeTruthy();

    const { status, user, idToken: token, refreshToken } = store.state.auth;

    expect(status).toBe('authenticated');
    expect(user).toEqual({
      name: 'Test',
      email: 'test2@test.com',
    });
    expect(typeof token).toBe('string');
    expect(typeof refreshToken).toBe('string');
  });

  it('should dispatch checkAuthentication action - APPROVED', async () => {
    const store = createVuexStore({
      status: 'not-authenticated',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const userPayload = { email: 'test@test.com', password: '123456' };

    await store.dispatch('auth/signInUser', userPayload);
    const { idToken } = store.state.auth;

    store.commit('auth/logout');

    localStorage.setItem('idToken', idToken);

    const { ok } = await store.dispatch('auth/checkAuthentication');
    const { status, user, idToken: token } = store.state.auth;

    expect(ok).toBeTruthy();

    expect(status).toBe('authenticated');
    expect(user).toEqual({
      name: 'User Test',
      email: 'test@test.com',
    });
    expect(typeof token).toBe('string');
  });

  it('should dispatch checkAuthentication action - DENIED', async () => {
    const store = createVuexStore({
      status: 'authenticating',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    localStorage.removeItem('idToken');
    const checkRes = await store.dispatch('auth/checkAuthentication');

    const { status } = store.state.auth;
    expect(checkRes).toEqual({ ok: false, message: 'There is no token' });
    expect(status).toBe('not-authenticated');

    const invalidIdToken = 'ABC-123';
    localStorage.setItem('idToken', invalidIdToken);

    const checkRes2 = await store.dispatch('auth/checkAuthentication');

    expect(checkRes2).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' });
    expect(status).toBe('not-authenticated');
  });
});
