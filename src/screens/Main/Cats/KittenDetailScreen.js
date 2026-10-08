import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { Badge, Btn, HeartBtn, Photo, Screen, Viewer, statusTone } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { usePageWidth } from '../../../hooks/usePageWidth';
import { cats, kittenById } from '../../../lib/copper-data';
import { selectFavKittens, toggleFavKitten } from '../../../redux/slices/appSlice';
import { shareText } from '../../../utils';
import { Missing } from './CatProfileScreen';

/** Ported from Project/src/components/cr/cats.tsx — KittenDetail. */
export default function KittenDetailScreen({ navigation, route }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const favKittens = useSelector(selectFavKittens);
  const [pageWidth, onPageLayout] = usePageWidth();
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [index, setIndex] = useState(0);
  const [viewing, setViewing] = useState(false);

  const kitten = kittenById(route.params?.id);
  if (!kitten) return <Missing navigation={navigation} />;

  const photos = kitten.gallery.map(src => ({ src }));
  const parents = kitten.parents.map(pid => cats.find(c => c.id === pid)).filter(Boolean);
  const sold = kitten.status === 'Sold';

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
            <HeartBtn on={favKittens.includes(kitten.id)} onPress={() => dispatch(toggleFavKitten(kitten.id))} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.headRow}>
            <Badge tone={statusTone(kitten.status)}>{kitten.status}</Badge>
            <Typography size={12} font="bodySemiBold" onPress={() => setViewing(true)}>
              Open gallery
            </Typography>
          </View>

          <Typography size={36} font="displaySemiBold" mT={8}>
            {kitten.name}
          </Typography>
          <Typography variant="bodySm">
            {kitten.coat} · {kitten.sex}
          </Typography>
          <Typography variant="displayMd" color="copper" mT={8}>
            {kitten.price}
          </Typography>
          <Typography size={15} lineHeight={23} mT={12}>
            {kitten.personality}
          </Typography>

          <View style={s.table}>
            <View style={[styles.tableCell, { borderBottomWidth: 1, borderBottomColor: colors.secondary }]}>
              <Typography variant="tiny">Date of birth</Typography>
              <Typography size={15}>{kitten.dob}</Typography>
            </View>
            <View style={styles.tableCell}>
              <Typography variant="tiny">Health guarantee</Typography>
              <Typography size={15} lineHeight={22}>
                Parents screened for HCM, SMA, and PK Def. Records travel with your kitten.
              </Typography>
            </View>
          </View>

          <Typography variant="displayMd" mT={20}>
            Parents
          </Typography>
          <View style={styles.parentRow}>
            {parents.map(p => (
              <Pressable
                key={p.id}
                onPress={() => navigation.navigate('CatProfileScreen', { id: p.id })}
                style={s.parentCard}
              >
                <Photo source={p.photo} style={styles.parentPhoto} radius={RADIUS.sm} />
                <Typography variant="displaySm" flex={1}>
                  {p.short}
                </Typography>
              </Pressable>
            ))}
          </View>

          <View style={styles.actions}>
            <Btn
              full
              disabled={sold}
              title={sold ? 'Placed With A Family' : 'Reserve / Submit Application'}
              onPress={() => navigation.navigate('ApplyScreen')}
            />
            <Btn
              full
              variant="outline"
              title="Ask a Question"
              icon={<Icon name="message-circle" size={Sizer.fS(16)} color={colors.foreground} />}
              onPress={() => navigation.navigate('ContactScreen')}
            />
            <Pressable
              onPress={() => shareText(`${kitten.name} at Copper Road Maine Coons`)}
              style={styles.shareRow}
            >
              <Typography size={14} font="bodySemiBold" textAlign="center">
                Share {kitten.name}
              </Typography>
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
    table: {
      marginTop: Sizer.vSize(16),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
    parentCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Sizer.hSize(8),
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      padding: Sizer.hSize(8),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  heartTR: { position: 'absolute', right: Sizer.hSize(12) },
  body: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(16) },
  headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tableCell: { paddingHorizontal: Sizer.hSize(16), paddingVertical: Sizer.vSize(12) },
  parentRow: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(8) },
  parentPhoto: { width: Sizer.hSize(56), height: Sizer.hSize(56) },
  actions: { gap: Sizer.vSize(8), marginTop: Sizer.vSize(20) },
  shareRow: { minHeight: Sizer.vSize(44), justifyContent: 'center' },
});
