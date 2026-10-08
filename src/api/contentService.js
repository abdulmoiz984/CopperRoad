import api from './api';
import { ENDPOINTS, USE_MOCK_API } from './endpoints';
import { mockResolve } from './mockAdapter';
import { articles, faqs, seedReviews } from '../lib/copper-data';

export const listArticles = async () => {
  if (USE_MOCK_API) return mockResolve(articles);
  const { data } = await api.get(ENDPOINTS.ARTICLES);
  return data;
};

export const getArticle = async id => {
  if (USE_MOCK_API) return mockResolve(articles.find(a => a.id === id));
  const { data } = await api.get(ENDPOINTS.ARTICLE(id));
  return data;
};

export const listFaqs = async () => {
  if (USE_MOCK_API) return mockResolve(faqs);
  const { data } = await api.get(ENDPOINTS.FAQS);
  return data;
};

export const listReviews = async () => {
  if (USE_MOCK_API) return mockResolve(seedReviews);
  const { data } = await api.get(ENDPOINTS.REVIEWS);
  return data;
};

export const createReview = async review => {
  if (USE_MOCK_API) return mockResolve({ ...review, id: `rev-${Date.now()}` });
  const { data } = await api.post(ENDPOINTS.REVIEWS, review);
  return data;
};

export const sendContact = async body => {
  if (USE_MOCK_API) return mockResolve({ success: true });
  const { data } = await api.post(ENDPOINTS.CONTACT, body);
  return data;
};

export const sendMessage = async body => {
  if (USE_MOCK_API) return mockResolve({ success: true });
  const { data } = await api.post(ENDPOINTS.MESSAGES, body);
  return data;
};
