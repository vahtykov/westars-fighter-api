import { AuthProvider } from 'react-admin';
import { storage } from '../utils/storage';
import config from '../config';

const apiUrl = `${config.api.host}${config.api.baseUrl}`;

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { accessToken, refreshToken } = await response.json();
      storage.setItem('authTokenKey', accessToken);
      storage.setItem('refreshTokenKey', refreshToken);
    } catch (error) {
      throw new Error('Network error');
    }
  },

  logout: () => {
    storage.removeItem('authTokenKey');
    storage.removeItem('refreshTokenKey');
    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      storage.removeItem('authTokenKey');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return storage.getItem('authTokenKey')
      ? Promise.resolve()
      : Promise.reject();
  },

  getPermissions: () => Promise.resolve(),

  getIdentity: async () => {
    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        headers: new Headers({
          Authorization: `Bearer ${storage.getItem('authTokenKey')}`,
        }),
      });
      const user = await response.json();
      return Promise.resolve({ id: user.id, fullName: `${user.firstName} ${user.lastName}` });
    } catch {
      return Promise.reject();
    }
  },
};
