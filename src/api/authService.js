import api from './api';
import { ENDPOINTS, USE_MOCK_API } from './endpoints';
import { mockResolve } from './mockAdapter';
import { demoUser } from '../lib/copper-data';
import { localId } from '../utils';

/**
 * The web never rejects a login — any address is accepted and a known one
 * restores the demo profile. `register` and `loginSocial` behave the same way.
 */
export const login = async body => {
  if (USE_MOCK_API) {
    const email = (body?.email ?? '').trim();
    const known = email.toLowerCase() === demoUser.email;
    return mockResolve({
      token: localId('tok_'),
      user: {
        ...demoUser,
        email: email || demoUser.email,
        password: body?.password ?? '',
        guest: false,
        firstName: known ? demoUser.firstName : email ? 'Alex' : demoUser.firstName,
        lastName: known ? demoUser.lastName : email ? 'Family' : demoUser.lastName,
      },
    });
  }
  const { data } = await api.post(ENDPOINTS.AUTH_LOGIN, body);
  return data;
};

export const loginSocial = async provider => {
  if (USE_MOCK_API) {
    return mockResolve({ token: localId('tok_'), user: { ...demoUser, guest: false } });
  }
  const { data } = await api.post(ENDPOINTS.AUTH_SOCIAL, { provider });
  return data;
};

/** Browsing without an account still needs a user record for the profile tab. */
export const continueAsGuest = async () => {
  if (USE_MOCK_API) {
    return mockResolve({
      token: localId('tok_'),
      user: { ...demoUser, firstName: 'Guest', lastName: 'Family', guest: true, password: '' },
    });
  }
  const { data } = await api.post(ENDPOINTS.AUTH_SOCIAL, { provider: 'guest' });
  return data;
};

export const register = async body => {
  if (USE_MOCK_API) {
    return mockResolve({ token: localId('tok_'), user: { ...demoUser, ...body, guest: false } });
  }
  const { data } = await api.post(ENDPOINTS.AUTH_REGISTER, body);
  return data;
};

export const resetPassword = async body => {
  if (USE_MOCK_API) return mockResolve({ success: true, email: body?.email });
  const { data } = await api.post(ENDPOINTS.AUTH_RESET_PASSWORD, body);
  return data;
};

export const logout = async () => {
  if (USE_MOCK_API) return mockResolve({ success: true });
  const { data } = await api.post(ENDPOINTS.AUTH_LOGOUT);
  return data;
};
