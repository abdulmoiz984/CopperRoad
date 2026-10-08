import api from './api';
import { ENDPOINTS, USE_MOCK_API } from './endpoints';
import { mockResolve } from './mockAdapter';
import { productById, products } from '../lib/copper-data';
import { orderId } from '../utils';

export const listProducts = async () => {
  if (USE_MOCK_API) return mockResolve(products);
  const { data } = await api.get(ENDPOINTS.PRODUCTS);
  return data;
};

export const getProduct = async id => {
  if (USE_MOCK_API) return mockResolve(productById(id));
  const { data } = await api.get(ENDPOINTS.PRODUCT(id));
  return data;
};

export const syncCart = async lines => {
  if (USE_MOCK_API) return mockResolve({ success: true, lines });
  const { data } = await api.put(ENDPOINTS.CART, { lines });
  return data;
};

export const createOrder = async order => {
  if (USE_MOCK_API) return mockResolve({ ...order, id: orderId(), status: 'Processing' });
  const { data } = await api.post(ENDPOINTS.ORDERS, order);
  return data;
};

export const listOrders = async () => {
  if (USE_MOCK_API) return mockResolve([]);
  const { data } = await api.get(ENDPOINTS.ORDERS);
  return data;
};

export const syncWishlist = async ids => {
  if (USE_MOCK_API) return mockResolve({ success: true, ids });
  const { data } = await api.put(ENDPOINTS.WISHLIST, { ids });
  return data;
};
