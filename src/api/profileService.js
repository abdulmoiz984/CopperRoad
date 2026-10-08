import api from './api';
import { ENDPOINTS, USE_MOCK_API } from './endpoints';
import { mockResolve } from './mockAdapter';
import { demoUser } from '../lib/copper-data';

export const getMe = async () => {
  if (USE_MOCK_API) return mockResolve(demoUser);
  const { data } = await api.get(ENDPOINTS.AUTH_ME);
  return data;
};

export const updateProfile = async patch => {
  if (USE_MOCK_API) return mockResolve({ ...demoUser, ...patch });
  const { data } = await api.put(ENDPOINTS.PROFILE_UPDATE, patch);
  return data;
};

export const changePassword = async body => {
  if (USE_MOCK_API) return mockResolve({ success: true });
  const { data } = await api.put(ENDPOINTS.PROFILE_PASSWORD, body);
  return data;
};

export const updateNotificationPreferences = async prefs => {
  if (USE_MOCK_API) return mockResolve(prefs);
  const { data } = await api.put(ENDPOINTS.PROFILE_NOTIFICATIONS, prefs);
  return data;
};

export const deleteAccount = async () => {
  if (USE_MOCK_API) return mockResolve({ success: true });
  const { data } = await api.delete(ENDPOINTS.PROFILE_DELETE);
  return data;
};
