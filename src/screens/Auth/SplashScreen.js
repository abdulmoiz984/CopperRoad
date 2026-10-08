import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StatusBar, StyleSheet, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Svg, { Path } from 'react-native-svg';
import { MOTION, RADIUS } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import { Typography } from '../../atomComponents';
import { useColors } from '../../hooks/useTheme';
import { IMAGES } from '../../assets/images';
import { selectOnboarded, selectUser } from '../../redux/slices/appSlice';

/**
 * Ported from Project/src/components/cr/auth.tsx — Splash.
 * The web runs four timed phases (logo, paw trail, tagline, bar) over 3s;
 * the same beats drive the animations here.
 */
export default function SplashScreen({ navigation }) {
  const colors = useColors();
  const user = useSelector(selectUser);
  const onboarded = useSelector(selectOnboarded);

  const logo = useRef(new Animated.Value(0)).current;
  const trail = useRef(new Animated.Value(0)).current;
  const tagline = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logo, { toValue: 1, duration: 1000, delay: 300, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(trail, { toValue: 1, duration: 700, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(tagline, { toValue: 1, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
    Animated.timing(bar, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: false }).start();
  }, [logo, trail, tagline, bar]);

  useEffect(() => {
    const target = !onboarded ? 'OnboardingScreen' : user ? 'MainTabs' : 'LoginScreen';
    const t = setTimeout(
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: target }] })),
      MOTION.splashMs + 800,
    );
    return () => clearTimeout(t);
  }, [navigation, onboarded, user]);

  return (
    <View style={[styles.root, { backgroundColor: colors.navy }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      {/* `bg-[#BD915F]/25 blur-3xl` — a soft copper bloom behind the mark. */}
      <View style={[styles.bloom, { backgroundColor: `${colors.copper}26` }]} />

      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: logo,
            transform: [{ scale: logo.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
          }}
        >
          <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        {/* The copper road the paw prints walk along. */}
        <Animated.View style={[styles.road, { opacity: trail }]}>
          <Svg viewBox="0 0 260 56" width="100%" height="100%">
            <Path
              d="M8 40 Q 80 8 130 30 T 252 22"
              fill="none"
              stroke={colors.copper}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={{ opacity: tagline }}>
          <Typography
            size={22}
            font="displayItalic"
            color="rgba(255,255,255,0.90)"
            textAlign="center"
            mT={8}
          >
            Breeding Healthy, Happy Maine Coon Cats
          </Typography>
        </Animated.View>
      </View>

      <View style={[styles.barTrack, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: colors.copper,
              width: bar.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  bloom: {
    position: 'absolute',
    width: Sizer.hSize(288),
    height: Sizer.hSize(288),
    borderRadius: Sizer.hSize(144),
  },
  center: { alignItems: 'center', paddingHorizontal: Sizer.hSize(32) },
  logo: { width: Sizer.hSize(220), height: Sizer.vSize(160) },
  road: { marginTop: Sizer.vSize(32), width: Sizer.hSize(256), height: Sizer.vSize(56) },
  barTrack: {
    position: 'absolute',
    left: Sizer.hSize(40),
    right: Sizer.hSize(40),
    bottom: Sizer.vSize(40),
    height: 3,
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: RADIUS.pill },
});
