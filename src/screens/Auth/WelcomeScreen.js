import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Sizer from '../../helpers/Sizer';
import Icon from '../../helpers/Icon';
import { Typography } from '../../atomComponents';
import { Btn, Pop } from '../../components';
import { useColors } from '../../hooks/useTheme';
import { IMAGES } from '../../assets/images';

/** The web rains twelve paw glyphs down the screen on a staggered loop. */
function PawFall({ index, height }) {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(v, {
        toValue: 1,
        duration: (2400 + (index % 4) * 300) * 1.0,
        delay: index * 120,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [v, index]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.paw,
        {
          left: ((index * 17) % 100) * (width / 100),
          opacity: v.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 0] }),
          transform: [
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [-20, height] }) },
            { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '220deg'] }) },
          ],
        },
      ]}
    >
      <Icon name="paw-print" size={Sizer.fS(18)} color={colors.copper} />
    </Animated.View>
  );
}

/** Ported from Project/src/components/cr/auth.tsx — Welcome. */
export default function WelcomeScreen({ navigation }) {
  const colors = useColors();
  const { height } = useWindowDimensions();

  const explore = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs', state: { routes: [{ name: 'CatsTab' }] } }],
      }),
    );

  return (
    <View style={[styles.root, { backgroundColor: colors.ice }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.ice} />
      {Array.from({ length: 12 }, (_, i) => (
        <PawFall key={i} index={i} height={height} />
      ))}

      <Pop>
        <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
      </Pop>
      <Typography size={36} font="displaySemiBold" color={colors.navy} textAlign="center" mT={24}>
        Welcome to the family!
      </Typography>
      <Typography size={14} color="#3E5670" textAlign="center" mT={8}>
        Your account is ready. The kittens are this way.
      </Typography>
      <Btn title="Explore Kittens" style={styles.cta} onPress={explore} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Sizer.hSize(32), overflow: 'hidden' },
  paw: { position: 'absolute', top: 0 },
  logo: { width: Sizer.hSize(170), height: Sizer.vSize(96) },
  cta: { marginTop: Sizer.vSize(32) },
});
