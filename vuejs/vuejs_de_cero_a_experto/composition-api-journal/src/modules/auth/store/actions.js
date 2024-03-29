import authApi from '@/api/authApi';

export const createUser = async ({ commit }, user) => {
  const { email, password, name } = user;
  try {
    const { data } = await authApi.post(':signUp', {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;

    await authApi.post(':update', {
      displayName: name,
      idToken,
      refreshToken,
    });

    delete user.password;
    commit('loginUser', { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    const message = error.response.data.error.message;
    return { ok: false, message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const { data } = await authApi.post(':signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    const { displayName, idToken, refreshToken } = data;
    user.name = displayName;

    delete user.password;
    commit('loginUser', { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    const message = error.response.data.error.message;
    return { ok: false, message };
  }
};

export const checkAuthentication = async ({ commit }) => {
  const idToken = localStorage.getItem('idToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!idToken) {
    commit('logout');
    return { ok: false, message: 'There is no token' };
  }
  try {
    const { data } = await authApi.post(':lookup', {
      idToken,
    });

    const { displayName, email } = data.users[0];
    // console.log(data);
    const user = { name: displayName, email };

    // console.log(user);

    commit('loginUser', { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    commit('logout');
    const message = error.response.data.error.message;
    return { ok: false, message };
  }
};
