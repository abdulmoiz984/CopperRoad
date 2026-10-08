import api from './api';
import { ENDPOINTS, USE_MOCK_API } from './endpoints';
import { mockResolve } from './mockAdapter';
import {
  cats,
  catById,
  galleryPhotos,
  kittens,
  kittenById,
  kittensOf,
  litters,
  pedigreeFor,
} from '../lib/copper-data';

export const listCats = async () => {
  if (USE_MOCK_API) return mockResolve(cats);
  const { data } = await api.get(ENDPOINTS.CATS);
  return data;
};

export const getCat = async id => {
  if (USE_MOCK_API) return mockResolve(catById(id));
  const { data } = await api.get(ENDPOINTS.CAT(id));
  return data;
};

export const getPedigree = async id => {
  if (USE_MOCK_API) {
    const cat = catById(id);
    return mockResolve(cat ? pedigreeFor(cat) : null);
  }
  const { data } = await api.get(ENDPOINTS.PEDIGREE(id));
  return data;
};

export const listKittens = async () => {
  if (USE_MOCK_API) return mockResolve(kittens);
  const { data } = await api.get(ENDPOINTS.KITTENS);
  return data;
};

export const getKitten = async id => {
  if (USE_MOCK_API) return mockResolve(kittenById(id));
  const { data } = await api.get(ENDPOINTS.KITTEN(id));
  return data;
};

export const listKittensOf = async catId => {
  if (USE_MOCK_API) return mockResolve(kittensOf(catId));
  const { data } = await api.get(`${ENDPOINTS.KITTENS}?parent=${catId}`);
  return data;
};

export const listLitters = async () => {
  if (USE_MOCK_API) return mockResolve(litters);
  const { data } = await api.get(ENDPOINTS.LITTERS);
  return data;
};

export const joinWaitlist = async litterId => {
  if (USE_MOCK_API) return mockResolve({ success: true, litterId });
  const { data } = await api.post(ENDPOINTS.WAITLIST, { litterId });
  return data;
};

export const listGallery = async () => {
  if (USE_MOCK_API) return mockResolve(galleryPhotos);
  const { data } = await api.get(ENDPOINTS.GALLERY);
  return data;
};
