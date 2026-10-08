import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { ApplyFab, Badge, Chip, Eyebrow, Photo, Screen, statusTone } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { cats, kittens } from '../../../lib/copper-data';

const SEGMENTS = ['Kittens', 'Queens', 'Kings', 'Family'];
const STATUSES = ['All', 'Available', 'Reserved', 'Sold'];

/** Ported from Project/src/components/cr/cats.tsx — CatsScreen. */
export default function CatsScreen({ navigation }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [segment, setSegment] = useState('Kittens');
  const [status, setStatus] = useState('All');

  const list = kittens.filter(k => status === 'All' || k.status === status);
  const parents = cats.filter(c =>
    segment === 'Queens'
      ? c.role === 'queen'
      : segment === 'Kings'
        ? c.role === 'king'
        : c.role === 'family' || c.role === 'memorial',
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <View style={[s.header, { paddingTop: Math.max(insets.top, Sizer.vSize(16)) + Sizer.vSize(8) }]}>
        <Eyebrow light>THE COPPER ROAD FAMILY</Eyebrow>
        <Typography size={36} font="displaySemiBold" color="#FFFFFF" mT={2}>
          Our Cats
        </Typography>
        <Typography
          size={14}
          font="bodySemiBold"
          color="copper"
          mT={8}
          onPress={() => navigation.navigate('BreedingScreen')}
        >
          View Breeding Plan
        </Typography>
      </View>

      <Screen padded={false} tabPad>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {SEGMENTS.map(item => (
            <Chip key={item} active={segment === item} onPress={() => setSegment(item)}>
              {item}
            </Chip>
          ))}
        </ScrollView>

        {segment === 'Kittens' ? (
          <View style={styles.body}>
            <View style={styles.statusRow}>
              {STATUSES.map(item => (
                <Chip key={item} active={status === item} onPress={() => setStatus(item)}>
                  {item}
                </Chip>
              ))}
            </View>

            <View style={styles.stack}>
              {list.map(k => (
                <Pressable
                  key={k.id}
                  onPress={() => navigation.navigate('KittenDetailScreen', { id: k.id })}
                  style={({ pressed }) => [s.listCard, { opacity: pressed ? 0.92 : 1 }]}
                >
                  <Photo source={k.photo} style={styles.listPhoto} radius={RADIUS.md} />
                  <View style={styles.listBody}>
                    <Badge tone={statusTone(k.status)}>{k.status}</Badge>
                    <Typography variant="displayMd" mT={4}>
                      {k.name}
                    </Typography>
                    <Typography variant="tiny">
                      {k.coat} · {k.sex}
                    </Typography>
                    <Typography size={14} font="bodySemiBold" color="copper" mT={4}>
                      {k.price}
                    </Typography>
                  </View>
                </Pressable>
              ))}
              {!list.length ? (
                <Typography variant="bodySm" textAlign="center" style={styles.none}>
                  No kittens in this status right now.
                </Typography>
              ) : null}
            </View>
          </View>
        ) : (
          <View style={[styles.body, styles.grid]}>
            {parents.map(c => (
              <Pressable
                key={c.id}
                onPress={() => navigation.navigate('CatProfileScreen', { id: c.id })}
                style={({ pressed }) => [s.gridCard, { opacity: pressed ? 0.92 : 1 }]}
              >
                <Photo source={c.photo} style={styles.gridPhoto} />
                <View style={styles.gridBody}>
                  <Typography variant="displaySm">{c.short}</Typography>
                  <Typography size={11} color="mutedForeground" mT={4}>
                    {c.tagline}
                  </Typography>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </Screen>

      {/* The web floats the Apply pill over Home and Cats only. */}
      <ApplyFab />
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    header: {
      backgroundColor: colors.navy,
      paddingHorizontal: Sizer.hSize(20),
      paddingBottom: Sizer.vSize(20),
    },
    listCard: {
      flexDirection: 'row',
      gap: Sizer.hSize(12),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(8),
      ...softShadow(colors),
    },
    gridCard: {
      width: '48%',
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  chips: { gap: Sizer.hSize(8), paddingHorizontal: Sizer.hSize(16), paddingVertical: Sizer.vSize(12) },
  body: { paddingHorizontal: Sizer.hSize(16) },
  statusRow: { flexDirection: 'row', gap: Sizer.hSize(8), marginBottom: Sizer.vSize(12) },
  stack: { gap: Sizer.vSize(12) },
  listPhoto: { width: Sizer.hSize(112), height: Sizer.hSize(112) },
  listBody: { flex: 1, paddingVertical: Sizer.vSize(4), alignItems: 'flex-start' },
  none: { paddingVertical: Sizer.vSize(32) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(12) },
  gridPhoto: { width: '100%', aspectRatio: 3 / 4 },
  gridBody: { padding: Sizer.hSize(12) },
});
