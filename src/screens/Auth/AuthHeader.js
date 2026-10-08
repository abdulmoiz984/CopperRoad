import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import { Typography } from '../../atomComponents';
import { useColors } from '../../hooks/useTheme';
import { IMAGES } from '../../assets/images';

/**
 * The navy cap over the auth forms — `rounded-b-[32px] bg-[#00264C]`.
 * Ported from auth.tsx's local AuthHeader.
 */
export default function AuthHeader({ title, sub }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.root, { backgroundColor: colors.navy, paddingTop: Math.max(insets.top, Sizer.vSize(20)) + Sizer.vSize(12) }]}
    >
      <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
      <Typography size={36} font="displaySemiBold" color="#FFFFFF" textAlign="center" mT={16}>
        {title}
      </Typography>
      <Typography size={14} color="rgba(255,255,255,0.75)" textAlign="center" mT={4}>
        {sub}
      </Typography>
    </View>
  );
}

/**
 * The navy cap bleeds to the top of the screen, so once a long form scrolls it
 * away the fields would run under the status bar. This sits above the scroll
 * view in the same navy: invisible while the header is at rest, an opaque bar
 * once it isn't.
 */
export function StatusScrim() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return <View pointerEvents="none" style={[styles.scrim, { height: insets.top, backgroundColor: colors.navy }]} />;
}

const styles = StyleSheet.create({
  root: {
    borderBottomLeftRadius: RADIUS.huge,
    borderBottomRightRadius: RADIUS.huge,
    paddingHorizontal: Sizer.hSize(24),
    paddingBottom: Sizer.vSize(32),
  },
  logo: { width: Sizer.hSize(140), height: Sizer.vSize(80), alignSelf: 'center' },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0 },
});
