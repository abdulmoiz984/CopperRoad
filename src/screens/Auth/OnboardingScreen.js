import React, { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OVERLAY, RADIUS } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import { Typography } from '../../atomComponents';
import { Btn, Eyebrow, Gradient, Rise } from '../../components';
import { useColors } from '../../hooks/useTheme';
import { IMAGES } from '../../assets/images';
import { usePageWidth } from '../../hooks/usePageWidth';
import { markOnboarded } from '../../redux/slices/appSlice';

/** The three slides, ported from auth.tsx. */
const SLIDES = [
  {
    image: IMAGES.rectangle17,
    eyebrow: 'WELCOME TO COPPER ROAD',
    title: "More Than A Cattery. We're A Family.",
    text: "At Copper Road Maine Coons, we're dedicated to raising healthy, happy, and sociable kittens, giving families a loving, gentle companion and a forever friend to cherish for years to come.",
  },
  {
    image: IMAGES.kiki,
    eyebrow: 'MEET OUR MAINE COONS',
    title: 'The Heart Of Copper Road',
    text: 'All of our Queens and Kings are purebred Maine Coons from carefully selected bloodlines, each with a documented 5-generation pedigree and registered with TICA and CFF.',
  },
  {
    image: IMAGES.happyKittenInHands,
    eyebrow: 'RESPONSIBLE BREEDING',
    title: 'Beauty Begins With Health.',
    text: 'Our breeding program is built around thoughtful planning, responsible care, and the health and well-being of every Maine Coon. Apply for a kitten, follow our breeding plan, and shop Copper Road merch, all in one place.',
  },
];

/** The deep navy the web fades its copy panel into. */
const PANEL = '#00162E';

/** Ported from Project/src/components/cr/auth.tsx — Onboarding. */
export default function OnboardingScreen({ navigation }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const scroller = useRef(null);
  const [index, setIndex] = useState(0);
  const [pageWidth, onPageLayout] = usePageWidth();

  const slide = SLIDES[index];
  const last = index === SLIDES.length - 1;

  const finish = () => {
    dispatch(markOnboarded());
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LoginScreen' }] }));
  };

  const go = next => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
    setIndex(clamped);
    scroller.current?.scrollTo({ x: clamped * pageWidth, animated: true });
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.navy }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      {/* The photo occupies the top 54%; slides page horizontally. */}
      <View
        style={styles.photoWrap}
        onLayout={onPageLayout}
      >
        <ScrollView
          ref={scroller}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={OVERLAY}
          onMomentumScrollEnd={e => {
            const page = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
            if (page !== index) setIndex(page);
          }}
        >
          {SLIDES.map(item => (
            <Image key={item.eyebrow} source={item.image} style={{ width: pageWidth, height: '100%' }} resizeMode="cover" />
          ))}
        </ScrollView>
        <Gradient
          colors={['rgba(0,22,46,0.75)', 'transparent']}
          style={styles.topScrim}
          pointerEvents="none"
        />
      </View>

      <Pressable
        onPress={finish}
        style={[styles.skip, { top: Math.max(insets.top, Sizer.vSize(16)) }]}
        hitSlop={6}
      >
        <Typography size={14} font="bodyMedium" color="#FFFFFF">
          Skip
        </Typography>
      </Pressable>

      <Gradient
        colors={['rgba(0,22,46,0)', PANEL, PANEL]}
        locations={[0, 0.22, 1]}
        style={[styles.panel, { paddingBottom: Math.max(insets.bottom, Sizer.vSize(32)) }]}
      >
        <Rise key={index}>
          <Eyebrow light>{slide.eyebrow}</Eyebrow>
          <Typography size={30} lineHeight={34} font="displaySemiBold" color="#FFFFFF" mT={8}>
            {slide.title}
          </Typography>
          <Typography size={14} lineHeight={21} color="rgba(255,255,255,0.95)" mT={10}>
            {slide.text}
          </Typography>
        </Rise>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {SLIDES.map((_, n) => (
              <Pressable key={n} onPress={() => go(n)} hitSlop={8}>
                <View
                  style={[
                    styles.dot,
                    n === index
                      ? { width: Sizer.hSize(24), backgroundColor: colors.copper }
                      : { width: Sizer.hSize(8), backgroundColor: 'rgba(255,255,255,0.45)' },
                  ]}
                />
              </Pressable>
            ))}
          </View>
          <Btn title={last ? 'Get Started' : 'Next'} onPress={() => (last ? finish() : go(index + 1))} />
        </View>
      </Gradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  photoWrap: { height: '52%' },
  topScrim: { position: 'absolute', top: 0, left: 0, right: 0, height: Sizer.vSize(112) },
  skip: {
    position: 'absolute',
    right: Sizer.hSize(20),
    zIndex: 10,
    height: Sizer.vSize(44),
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(0,22,46,0.55)',
    paddingHorizontal: Sizer.hSize(16),
  },
  panel: {
    flex: 1,
    // Pulls the fade up over the photo the way the web's `top: 46%` does.
    marginTop: -Sizer.vSize(56),
    justifyContent: 'flex-end',
    paddingHorizontal: Sizer.hSize(24),
    paddingTop: Sizer.vSize(32),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizer.vSize(24),
  },
  dots: { flexDirection: 'row', gap: Sizer.hSize(6) },
  dot: { height: Sizer.vSize(8), borderRadius: RADIUS.pill },
});
