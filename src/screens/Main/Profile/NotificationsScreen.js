import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { selectNotif } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/profile.tsx — NotificationsScreen. */
export default function NotificationsScreen({ navigation }) {
  const colors = useColors();
  const notif = useSelector(selectNotif);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const items = [
    notif.kittens && {
      title: 'Seraphina is still available',
      body: 'A silver tortoiseshell who loves a lap.',
      go: () => navigation.navigate('KittenDetailScreen', { id: 'seraphina' }),
    },
    notif.litters && {
      title: 'Olive & Roman are expecting',
      body: 'Join the waitlist for silver and calico kittens.',
      go: () => navigation.navigate('BreedingScreen'),
    },
    notif.orders && {
      title: 'Order CR-M-1042 delivered',
      body: 'Your classic tee arrived.',
      go: () => navigation.navigate('OrderDetailScreen', { id: 'CR-M-1042' }),
    },
  ].filter(Boolean);

  return (
    <View style={s.root}>
      <BackBar title="Notifications" />
      <Screen contentStyle={styles.body}>
        {!items.length ? (
          <Typography variant="bodySm">Notifications are paused in settings.</Typography>
        ) : (
          <View style={styles.stack}>
            {items.map(n => (
              <Pressable key={n.title} onPress={n.go} style={({ pressed }) => [s.card, { opacity: pressed ? 0.92 : 1 }]}>
                <Typography size={15} font="bodySemiBold">
                  {n.title}
                </Typography>
                <Typography variant="bodySm" mT={4}>
                  {n.body}
                </Typography>
              </Pressable>
            ))}
          </View>
        )}
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    card: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(8) },
});
