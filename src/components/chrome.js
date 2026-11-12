import React from 'react';
import {
  Image,
  Modal as RNModal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RADIUS, TABBAR_HEIGHT, WINDOW, liftShadow, softShadow } from '../globalStyle/Theme';
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

/**
 * The navy header every tab screen wears: logo, search, cart, bell, and the
 * copper Menu button that opens the app-wide dropdown. `children` is the
 * tab's own title block, drawn inside the same navy panel so the two read as
 * one header.
 */
export function HomeHeader({ children, contentStyle }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const cartCount = useSelector(selectCartCount);
  const unread = useSelector(selectUnread);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <View style={[styles.homeHeaderWrap, { backgroundColor: colors.navy, paddingTop: Math.max(insets.top, Sizer.vSize(10)) }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <View style={styles.homeHeader}>
        <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.flex} />
        <IconBtn name="search" onPress={() => navigation.navigate('SearchScreen')} />
        <IconBtn name="shopping-bag" badge={cartCount} onPress={() => navigation.navigate('CartScreen')} />
        <IconBtn name="bell" badge={unread} onPress={() => navigation.navigate('NotificationsScreen')} />
        <Pressable
          onPress={() => setMenuOpen(true)}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          style={({ pressed }) => [styles.menuBtn, { backgroundColor: colors.copper, opacity: pressed ? 0.85 : 1 }]}
        >
          <Icon name="menu" size={Sizer.fS(18)} color={colors.navy} />
          <Typography size={13} font="bodySemiBold" color={colors.navy}>
            Menu
          </Typography>
        </Pressable>
      </View>

      {children ? <View style={[styles.homeHeaderBody, contentStyle]}>{children}</View> : null}

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}

/** Everything the app can reach, grouped the way families look for it. */
export const MENU_GROUPS = [
  {
    title: 'Browse',
    items: [
      { label: 'Home', icon: 'house', route: 'HomeTab' },
      { label: 'Our Cats & Kittens', icon: 'paw-print', route: 'CatsTab' },
      { label: 'Breeding Plan & Litters', icon: 'heart', route: 'BreedingScreen' },
      { label: 'Gallery', icon: 'image', route: 'GalleryScreen' },
      { label: 'Shop', icon: 'shopping-bag', route: 'ShopTab' },
      { label: 'Learn', icon: 'book-open', route: 'LearnTab' },
      { label: 'Search', icon: 'search', route: 'SearchScreen' },
    ],
  },
  {
    title: 'My Account',
    items: [
      { label: 'My Profile', icon: 'user-round', route: 'ProfileTab' },
      { label: 'My Applications', icon: 'file-text', route: 'ApplicationsScreen' },
      { label: 'My Kitten Journey', icon: 'map', route: 'JourneyScreen' },
      { label: 'Favorites', icon: 'heart', route: 'FavoritesScreen' },
      { label: 'Wishlist', icon: 'bookmark', route: 'WishlistScreen' },
      { label: 'My Orders', icon: 'package', route: 'OrdersScreen' },
      { label: 'Cart', icon: 'shopping-bag', route: 'CartScreen' },
      { label: 'Messages', icon: 'message-circle', route: 'MessagesScreen' },
      { label: 'Notifications', icon: 'bell', route: 'NotificationsScreen' },
    ],
  },
  {
    title: 'Copper Road',
    items: [
      { label: 'About Us', icon: 'info', route: 'AboutScreen' },
      { label: 'Testimonials', icon: 'star', route: 'TestimonialsScreen' },
      { label: "FAQ's", icon: 'circle-help', route: 'FaqsScreen' },
      { label: 'Contact Us', icon: 'mail', route: 'ContactScreen' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Settings', icon: 'settings', route: 'SettingsScreen' },
      { label: 'Notification Settings', icon: 'bell-ring', route: 'NotifSettingsScreen' },
      { label: 'Help & Support', icon: 'life-buoy', route: 'HelpScreen' },
      { label: 'Terms & Privacy', icon: 'scale', route: 'LegalScreen' },
    ],
  },
];

/** The dropdown the Menu button opens, anchored under the header. */
export function AppMenu({ open, onClose }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const go = route => {
    onClose();
    navigation.navigate(route);
  };

  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.menuBackdrop, { backgroundColor: colors.scrim }]} onPress={onClose}>
        <Pressable
          style={[
            styles.menuPanel,
            {
              backgroundColor: colors.card,
              marginTop: Math.max(insets.top, Sizer.vSize(10)) + Sizer.vSize(8),
              maxHeight: WINDOW.height * 0.8,
            },
            liftShadow(colors),
          ]}
        >
          <View style={[styles.menuHead, { borderBottomColor: colors.border }]}>
            <Typography variant="displayMd" flex={1}>
              Menu
            </Typography>
            <Pressable onPress={onClose} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close menu">
              <Icon name="x" size={Sizer.fS(20)} color={colors.foreground} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuScroll}>
            <Pressable
              onPress={() => go('ApplyScreen')}
              style={({ pressed }) => [styles.menuCta, { backgroundColor: colors.copper, opacity: pressed ? 0.9 : 1 }]}
            >
              <Icon name="file-text" size={Sizer.fS(18)} color={colors.navy} />
              <Typography size={15} font="bodySemiBold" color={colors.navy}>
                Submit An Application
              </Typography>
            </Pressable>

            {MENU_GROUPS.map(group => (
              <View key={group.title} style={styles.menuGroup}>
                <Typography variant="eyebrow" color="copper" mB={4} style={styles.menuGroupTitle}>
                  {group.title}
                </Typography>
                {group.items.map(item => (
                  <Pressable
                    key={`${group.title}-${item.label}`}
                    onPress={() => go(item.route)}
                    style={({ pressed }) => [
                      styles.menuItem,
                      { backgroundColor: pressed ? colors.secondary : 'transparent' },
                    ]}
                  >
                    <Icon name={item.icon} size={Sizer.fS(18)} color={colors.copper} />
                    <Typography size={15} flex={1}>
                      {item.label}
                    </Typography>
                    <Icon name="chevron-right" size={Sizer.fS(16)} color={colors.dim} />
                  </Pressable>
                ))}
              </View>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
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

  homeHeaderWrap: { paddingBottom: Sizer.vSize(12) },
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(4),
    paddingHorizontal: Sizer.hSize(12),
  },
  homeHeaderBody: { paddingHorizontal: Sizer.hSize(20), paddingTop: Sizer.vSize(12) },
  logo: { width: Sizer.hSize(78), height: Sizer.vSize(40) },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(5),
    height: Sizer.vSize(36),
    paddingHorizontal: Sizer.hSize(10),
    borderRadius: RADIUS.pill,
  },

  menuBackdrop: { flex: 1, alignItems: 'center' },
  menuPanel: {
    width: '94%',
    borderRadius: RADIUS.xxxl,
    overflow: 'hidden',
  },
  menuHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(8),
    paddingHorizontal: Sizer.hSize(18),
    paddingVertical: Sizer.vSize(14),
    borderBottomWidth: 1,
  },
  menuScroll: { paddingHorizontal: Sizer.hSize(12), paddingVertical: Sizer.vSize(12) },
  menuCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizer.hSize(8),
    height: Sizer.vSize(48),
    borderRadius: RADIUS.pill,
  },
  menuGroup: { marginTop: Sizer.vSize(18), gap: Sizer.vSize(2) },
  menuGroupTitle: { paddingHorizontal: Sizer.hSize(10) },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(12),
    paddingHorizontal: Sizer.hSize(10),
    paddingVertical: Sizer.vSize(11),
    borderRadius: RADIUS.sm,
  },

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
