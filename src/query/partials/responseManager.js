import { CommonActions } from '@react-navigation/native';
import { KEYS } from '../../constants';
import { handleLogout, markOnboarded, setUser } from '../../redux/slices/appSlice';
import { queryClient, storage } from '../../api/api';
import { listCats, listKittens } from '../../api/catteryService';
import { listProducts } from '../../api/shopService';
import { QK } from '../queryKeys';

async function prefetchData() {
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: QK.cats, queryFn: listCats }),
    queryClient.prefetchQuery({ queryKey: QK.kittens, queryFn: listKittens }),
    queryClient.prefetchQuery({ queryKey: QK.products, queryFn: listProducts }),
  ]);
}

const resetTo = (navigation, name) =>
  navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name }] }));

/**
 * The web sends a fresh registration to the Welcome screen and everyone else
 * straight to the home tab; `destination` lets the caller say which.
 */
export const onAuthSuccess = async (
  response,
  navigation,
  dispatch,
  { credentials = {}, destination = 'MainTabs' } = {},
) => {
  try {
    const token = response?.token;
    const user = response?.user ?? null;
    if (!token) return;

    dispatch(setUser(user));
    dispatch(markOnboarded());
    storage.set(KEYS.ACCESS_TOKEN, token);
    if (credentials.email) {
      storage.set(
        KEYS.CREDENTIALS,
        JSON.stringify({ email: credentials.email, password: credentials.password ?? '' }),
      );
    }

    try {
      await prefetchData();
    } catch (err) {
      console.warn('Post-auth prefetch failed:', err?.message);
    }

    resetTo(navigation, destination);
  } catch (err) {
    console.log('onAuthSuccess error:', err);
  }
};

export const onLogoutSuccess = (dispatch, navigation) => {
  dispatch(handleLogout());
  storage.delete(KEYS.ACCESS_TOKEN);
  storage.delete(KEYS.CREDENTIALS);
  queryClient.clear();
  resetTo(navigation, 'LoginScreen');
};
