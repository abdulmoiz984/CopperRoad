import api from './api';
import { ENDPOINTS, USE_MOCK_API } from './endpoints';
import { mockResolve } from './mockAdapter';
import { applicationId } from '../utils';

export const listApplications = async () => {
  if (USE_MOCK_API) return mockResolve([]);
  const { data } = await api.get(ENDPOINTS.APPLICATIONS);
  return data;
};

export const getApplication = async id => {
  if (USE_MOCK_API) return mockResolve(null);
  const { data } = await api.get(ENDPOINTS.APPLICATION(id));
  return data;
};

export const createApplication = async payload => {
  if (USE_MOCK_API) return mockResolve({ id: applicationId(), status: 'Submitted' });
  const { data } = await api.post(ENDPOINTS.APPLICATIONS, payload);
  return data;
};

export const saveApplicationDraft = async payload => {
  if (USE_MOCK_API) return mockResolve({ success: true });
  const { data } = await api.put(ENDPOINTS.APPLICATION_DRAFT, payload);
  return data;
};
