import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { Btn, Eyebrow, HeartBtn, Photo, Screen, Viewer } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { usePageWidth } from '../../../hooks/usePageWidth';
import { cats, kittensOf } from '../../../lib/copper-data';
import { selectFavCats, toggleFavCat } from '../../../redux/slices/appSlice';
import { shareText } from '../../../utils';

const ROLE_LABEL = { memorial: 'IN LOVING MEMORY', queen: 'QUEEN', king: 'KING', family: 'FAMILY' };

/** Ported from Project/src/components/cr/cats.tsx — CatProfile. */
export default function CatProfileScreen({ navigation, route }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const favCats = useSelector(selectFavCats);
  const [pageWidth, onPageLayout] = usePageWidth();
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [index, setIndex] = useState(0);
  const [viewing, setViewing] = useState(false);

  const cat = cats.find(c => c.id === route.params?.id);
  if (!cat) return <Missing navigation={navigation} />;

  const photos = cat.gallery.map(src => ({ src }));
  const babies = kittensOf(cat.id);

  const rows = [
    ['Coat / Color', cat.coat],
    ['Sex', cat.sex],
    ['Registry', 'TICA'],
    ['Pedigree', cat.role === 'memorial' || cat.role === 'family' ? cat.pedigreeNote : '5-generation'],
    ['Health Testing', cat.health],
  ];

  return (
    <View style={s.root}>
      <Screen padded={false}>
        <View onLayout={onPageLayout}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / pageWidth))}
          >
            {photos.map((p, n) => (
              <Photo key={n} source={p.src} style={{ width: pageWidth, height: Sizer.vSize(320) }} />
            ))}
          </ScrollView>

          <Pressable
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            style={[s.float, { top: Math.max(insets.top, Sizer.vSize(12)) }]}
            hitSlop={6}
          >
            <Icon name="arrow-left" size={Sizer.fS(18)} color={colors.navy} />
          </Pressable>

          <View style={[styles.heartTR, { top: Math.max(insets.top, Sizer.vSize(12)) }]}>
            <HeartBtn on={favCats.includes(cat.id)} onPress={() => dispatch(toggleFavCat(cat.id))} />
          </View>

          <View style={styles.dots}>
            {photos.map((_, n) => (
              <View
                key={n}
                style={[
                  styles.dot,
                  n === index
                    ? { width: Sizer.hSize(20), backgroundColor: colors.copper }
                    : { width: Sizer.hSize(8), backgroundColor: 'rgba(255,255,255,0.70)' },
                ]}
              />
            ))}
          </View>

          <Pressable onPress={() => setViewing(true)} style={[s.viewPill, { bottom: Sizer.vSize(12) }]}>
            <Typography size={12} font="bodySemiBold" color={colors.navy}>
              View
            </Typography>
          </Pressable>
        </View>

        <View style={styles.body}>
          <Eyebrow>{ROLE_LABEL[cat.role] ?? 'FAMILY'}</Eyebrow>
          <Typography size={36} font="displaySemiBold" mT={2}>
            {cat.name}
          </Typography>
          <Typography size={15} color="copper">
            {cat.tagline}
          </Typography>
          <Typography size={15} lineHeight={23} mT={12}>
            {cat.bio}
          </Typography>

          <View style={s.table}>
            {rows.map(([k, v], i) => (
              <View key={k} style={[styles.tableRow, i < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.secondary }]}>
                <Typography size={14} color="mutedForeground">
                  {k}
                </Typography>
                <Typography size={14} font="bodyMedium" flex={1} textAlign="right">
                  {v}
                </Typography>
              </View>
            ))}
          </View>

          <Typography
            size={14}
            font="bodySemiBold"
            color="copper"
            mT={12}
            onPress={() => navigation.navigate('PedigreeScreen', { id: cat.id })}
          >
            View 5-generation pedigree
          </Typography>

          {babies.length > 0 ? (
            <View style={styles.block}>
              <Typography variant="displayMd">Their Kittens</Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.babyRow}>
                {babies.map(k => (
                  <Pressable
                    key={k.id}
                    onPress={() => navigation.navigate('KittenDetailScreen', { id: k.id })}
                    style={s.babyCard}
                  >
                    <Photo source={k.photo} style={styles.babyPhoto} />
                    <Typography variant="displaySm" style={styles.babyName}>
                      {k.name}
                    </Typography>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : null}

          <View style={styles.actions}>
            <View style={styles.flex}>
              <Btn full title="Inquire About Kittens" onPress={() => navigation.navigate('ApplyScreen')} />
            </View>
            <Pressable
              onPress={() => shareText(`${cat.name} — ${cat.tagline} at Copper Road`)}
              style={s.shareBtn}
            >
              <Icon name="share-2" size={Sizer.fS(18)} color={colors.foreground} />
            </Pressable>
          </View>
        </View>
      </Screen>

      {viewing ? (
        <Viewer photos={photos} index={index} onClose={() => setViewing(false)} onIndex={setIndex} />
      ) : null}
    </View>
  );
}

/** The web's `Missing` fallback. */
export function Missing({ navigation }) {
  return (
    <View style={styles.missing}>
      <Typography variant="body">We couldn't find that page.</Typography>
      <Btn title="Go back" style={styles.missingCta} onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    float: {
      position: 'absolute',
      left: Sizer.hSize(12),
      width: Sizer.hSize(44),
      height: Sizer.hSize(44),
      borderRadius: Sizer.hSize(22),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.glass,
    },
    viewPill: {
      position: 'absolute',
      right: Sizer.hSize(12),
      borderRadius: RADIUS.pill,
      backgroundColor: colors.glass,
      paddingHorizontal: Sizer.hSize(12),
      paddingVertical: Sizer.vSize(8),
    },
    table: {
      marginTop: Sizer.vSize(16),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
    babyCard: {
      width: Sizer.hSize(144),
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
    shareBtn: {
      width: Sizer.hSize(48),
      height: Sizer.vSize(48),
      borderRadius: RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  heartTR: { position: 'absolute', right: Sizer.hSize(12) },
  dots: {
    position: 'absolute',
    bottom: Sizer.vSize(12),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Sizer.hSize(4),
  },
  dot: { height: Sizer.vSize(8), borderRadius: RADIUS.pill },
  body: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(16) },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Sizer.hSize(16),
    paddingHorizontal: Sizer.hSize(16),
    paddingVertical: Sizer.vSize(12),
  },
  block: { marginTop: Sizer.vSize(24) },
  babyRow: { gap: Sizer.hSize(8), paddingTop: Sizer.vSize(8) },
  babyPhoto: { width: '100%', height: Sizer.vSize(112) },
  babyName: { padding: Sizer.hSize(8) },
  actions: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(24) },
  missing: { flex: 1, padding: Sizer.hSize(24), justifyContent: 'center' },
  missingCta: { marginTop: Sizer.vSize(16) },
});
