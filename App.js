import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import { Provider as ReduxProvider } from 'react-redux';
import RootStack from './src/navigation/RootStack';
import { queryClient } from './src/api/api';
import store from './src/redux/store/store';
import { ThemeProvider } from './src/hooks/useTheme';

/**
 * `react-native-flash-message` only reads `StatusBar.currentHeight`, which is
 * Android-only, so on iOS the pill rendered under the notch. Feeding it the
 * real top inset puts it clear of the status bar on both platforms.
 */
function Toasts() {
  const insets = useSafeAreaInsets();
  return <FlashMessage position="top" statusBarHeight={insets.top} />;
}

/**
 * ThemeProvider sits inside Redux (it reads MMKV through api/api) and outside
 * navigation, so every screen and the navigation chrome recolour together.
 */
export default function App() {
  return (
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <RootStack />
              <Toasts />
            </QueryClientProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ReduxProvider>
  );
}
