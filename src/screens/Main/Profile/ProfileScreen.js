import React, { useMemo, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { Btn, Modal, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { onLogoutSuccess } from '../../../query/partials/responseManager';
import { selectUser } from '../../../redux/slices/appSlice';

/** The 14 tiles, in the web's order, with the route each one opens. */
const TILES = [
  ['ApplicationsScreen', 'My Applications'],
  ['JourneyScreen', 'My Kitten Journey'],
  ['FavoritesScreen', 'Favorites'],
  ['OrdersScreen', 'My Orders'],
  ['WishlistScreen', 'Wishlist'],
  ['MessagesScreen', 'Messages'],
  ['GalleryScreen', 'Gallery'],
  ['TestimonialsScreen', 'Testimonials'],
  ['AboutScreen', 'About Us'],
  ['FaqsScreen', "FAQ's"],
  ['NotificationsScreen', 'Notifications'],
  ['NotifSettingsScreen', 'Notification Settings'],
  ['SettingsScreen', 'Settings'],
  ['HelpScreen', 'Help & Support'],
];

/** Ported from Project/src/components/cr/profile.tsx — ProfileScreen. */
export default function ProfileScreen({ navigation }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const name = user ? `${user.firstName} ${user.lastName}` : 'Guest';
  const initials = `${(user?.firstName || 'G').slice(0, 1)}${(user?.lastName || '').slice(0, 1)}`;

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <View style={[s.header, { paddingTop: Math.max(insets.top, Sizer.vSize(20)) + Sizer.vSize(8) }]}>
        <View style={styles.identity}>
          <View style={[styles.avatar, { backgroundColor: colors.copper }]}>
            <Typography variant="displayMd" color={colors.navy}>
              {initials}
            </Typography>
          </View>
          <View style={styles.flex}>
            <Typography variant="displayLg" color="#FFFFFF">
              {name}
            </Typography>
            <View style={[styles.pill, { backgroundColor: colors.copper }]}>
              <Typography size={11} font="bodySemiBold" color={colors.navy}>
                Family Member
              </Typography>
            </View>
          </View>
        </View>
        {user?.guest ? (
          <Typography
            size={14}
            font="bodySemiBold"
            color="copper"
            mT={12}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            Create an account
          </Typography>
        ) : null}
      </View>

      <Screen padded={false} tabPad>
        <View style={styles.grid}>
          {TILES.map(([screen, label]) => (
            <Pressable
              key={screen}
              onPress={() => navigation.navigate(screen)}
              style={({ pressed }) => [s.tile, { opacity: pressed ? 0.92 : 1 }]}
            >
              <Typography variant="displaySm" lineHeight={24}>
                {label}
              </Typography>
            </Pressable>
          ))}
        </View>

        <View style={styles.body}>
          <Btn full variant="outline" title="Log Out" onPress={() => setLogoutOpen(true)} />
        </View>
      </Screen>

      <Modal
        open={logoutOpen}
        title="Log out?"
        body="You can sign back in anytime to see your applications and orders."
        confirm="Log Out"
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          onLogoutSuccess(dispatch, navigation);
        }}
      />
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    header: {
      backgroundColor: colors.navy,
      paddingHorizontal: Sizer.hSize(20),
      paddingBottom: Sizer.vSize(24),
    },
    tile: {
      width: '48%',
      minHeight: Sizer.vSize(88),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(12) },
  avatar: {
    width: Sizer.hSize(64),
    height: Sizer.hSize(64),
    borderRadius: Sizer.hSize(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.pill,
    paddingHorizontal: Sizer.hSize(8),
    paddingVertical: Sizer.vSize(2),
    marginTop: Sizer.vSize(4),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Sizer.hSize(12),
    paddingHorizontal: Sizer.hSize(16),
    paddingVertical: Sizer.vSize(16),
  },
  body: { paddingHorizontal: Sizer.hSize(16) },
});
