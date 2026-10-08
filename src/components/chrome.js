import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RADIUS, SPACING, TABBAR_HEIGHT, liftShadow, softShadow } from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';
import Icon from '../helpers/Icon';
import { Typography } from '../atomComponents';
import { useColors, useTheme } from '../hooks/useTheme';
import { IMAGES } from '../assets/images';
import { selectCartCount, selectUnread } from '../redux/slices/appSlice';
import { IconBtn } from './kit';

/** The web's `BackBar` — back button, display title, optional right slot. */
export function BackBar({ title, subtitle, right, onBack }) {
  const colors = useColors();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.backBar,
        { backgroundColor: colors.background, paddingTop: Math.max(insets.top, Sizer.vSize(10)) },
      ]}
    >
      {/* Tab screens set light-content for their navy header; a pushed screen
          sits on the page background and needs the opposite in light mode. */}
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Pressable
        onPress={onBack ?? (() => navigation.canGoBack() && navigation.goBack())}
        hitSlop={8}
        style={({ pressed }) => [
          styles.backBtn,
          { backgroundColor: colors.card, opacity: pressed ? 0.75 : 1 },
          softShadow(colors),
        ]}
      >
        <Icon name="arrow-left" size={Sizer.fS(18)} color={colors.foreground} />
      </Pressable>
      <View style={styles.backBarText}>
        <Typography variant="display" numberOfLines={1}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="tiny" numberOfLines={1}>
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {right}
    </View>
  );
}

/** The navy header on the five tab screens: logo, search, cart, bell. */
export function HomeHeader() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const cartCount = useSelector(selectCartCount);
  const unread = useSelector(selectUnread);

  return (
    <View style={[styles.homeHeader, { backgroundColor: colors.navy, paddingTop: Math.max(insets.top, Sizer.vSize(10)) }]}>
      <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.flex} />
      <IconBtn name="search" onPress={() => navigation.navigate('SearchScreen')} />
      <IconBtn name="shopping-bag" badge={cartCount} onPress={() => navigation.navigate('CartScreen')} />
      <IconBtn name="bell" badge={unread} onPress={() => navigation.navigate('NotificationsScreen')} />
    </View>
  );
}

export const TABS = [
  { name: 'HomeTab', label: 'Home', icon: 'house' },
  { name: 'CatsTab', label: 'Cats', icon: 'paw-print' },
  { name: 'ShopTab', label: 'Shop', icon: 'shopping-bag' },
  { name: 'LearnTab', label: 'Learn', icon: 'book-open' },
  { name: 'ProfileTab', label: 'Profile', icon: 'user-round' },
];

/** `h-[76px] grid-cols-5 bg-[#00264C]` — copper for the active tab. */
export function TabBar({ state, navigation }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        { backgroundColor: colors.navy, paddingBottom: Math.max(insets.bottom, Sizer.vSize(8)) },
      ]}
    >
      {state.routes.map((route, index) => {
        const tab = TABS.find(t => t.name === route.name);
        if (!tab) return null;
        const active = state.index === index;
        const tint = active ? colors.copper : 'rgba(255,255,255,0.70)';
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
            hitSlop={4}
          >
            <Icon name={tab.icon} size={Sizer.fS(20)} color={tint} strokeWidth={active ? 2.1 : 1.75} />
            <Typography size={10} font="bodyMedium" color={tint} mT={2}>
              {tab.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}

/** The copper "Apply" pill that floats over Home and Cats. */
export function ApplyFab() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('ApplyScreen')}
      style={({ pressed }) => [
        styles.fab,
        {
          backgroundColor: colors.copper,
          bottom: Sizer.vSize(12) + TABBAR_HEIGHT + Math.max(insets.bottom, Sizer.vSize(8)),
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
        liftShadow(colors),
      ]}
    >
      <Typography size={14} font="bodySemiBold" color={colors.navy}>
        Apply
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(8),
    paddingHorizontal: Sizer.hSize(12),
    paddingBottom: Sizer.vSize(12),
  },
  backBtn: {
    width: Sizer.hSize(44),
    height: Sizer.hSize(44),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBarText: { flex: 1, minWidth: 0 },

  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(8),
    paddingHorizontal: Sizer.hSize(SPACING.screenPx),
    paddingBottom: Sizer.vSize(12),
  },
  logo: { width: Sizer.hSize(104), height: Sizer.vSize(44) },

  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: Sizer.vSize(8),
    paddingHorizontal: Sizer.hSize(4),
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', height: Sizer.vSize(48) },

  fab: {
    position: 'absolute',
    right: Sizer.hSize(16),
    height: Sizer.vSize(48),
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: Sizer.hSize(18),
  },
});
