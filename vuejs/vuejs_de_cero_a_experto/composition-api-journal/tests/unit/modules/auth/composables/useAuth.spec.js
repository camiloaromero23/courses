import useAuth from '@/modules/auth/composables/useAuth';

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: { 'auth/currentState': 'authenticated', 'auth/username': 'Test' },
};

jest.mock('vuex', () => ({ useStore: () => mockStore }));

describe('useAuth composable tests', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should create user succesfully', async () => {
    const { createUser } = useAuth();

    const newUser = {
      name: 'Test',
      email: 'test@test.com',
    };
    mockStore.dispatch.mockReturnValue({ ok: true });

    const { ok } = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser);
    expect(ok).toBeTruthy();
  });

  it('should fail create user - USER EXISTS', async () => {
    const { createUser } = useAuth();

    const newUser = {
      name: 'Test',
      email: 'test@test.com',
    };
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' });

    const res = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser);
    expect(res).toEqual({ ok: false, message: 'EMAIL_EXISTS' });
  });

  it('should login user succesfully', async () => {
    const { loginUser } = useAuth();

    const loginFormData = {
      email: 'test@test.com',
      password: '123456',
    };
    mockStore.dispatch.mockReturnValue({ ok: true });

    const { ok } = await loginUser(loginFormData);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'auth/signInUser',
      loginFormData,
    );

    expect(ok).toBeTruthy();
  });

  it('should fail logging user in - EMAIL/PASSWORD do not exist', async () => {
    const { loginUser } = useAuth();

    const loginFormData = {
      name: 'Test',
      password: '123456',
    };
    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: 'Wrong EMAIL/PASSWORD',
    });

    const res = await loginUser(loginFormData);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'auth/signInUser',
      loginFormData,
    );
    expect(res).toEqual({ ok: false, message: 'Wrong EMAIL/PASSWORD' });
  });

  it('should check status succesfully', async () => {
    const { checkAuthStatus } = useAuth();

    mockStore.dispatch.mockReturnValue({ ok: true });

    const { ok } = await checkAuthStatus();

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication');
    expect(ok).toBeTruthy();
  });

  it('should logout succesfully', () => {
    const { logout } = useAuth();

    logout();
    // mockStore.commit.mockReturnValue()

    expect(mockStore.commit).toHaveBeenCalledWith('auth/logout');
    expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries');
  });

  it('should use computed getters appropiately', async () => {
    const { authStatus, username } = useAuth();

    expect(authStatus.value).toBe('authenticated');
    expect(username.value).toBe('Test');
  });
});
