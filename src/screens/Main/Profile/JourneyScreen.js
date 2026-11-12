import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Photo, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { kittenById } from '../../../lib/copper-data';

const ITEMS = [
  'Deposit conversation',
  'Home visit or video call',
  'Carrier ready',
  'Veterinarian chosen',
  'Go-home day',
];

/** Ported from Project/src/components/cr/profile.tsx — Journey. */
export default function JourneyScreen({ navigation }) {
  const colors = useColors();
  const s = useMemo(() => makeStyles(colors), [colors]);
  const kitten = kittenById('olive-2');

  return (
    <View style={s.root}>
      <BackBar title="My Kitten Journey" />
      <Screen contentStyle={styles.body}>
        <View style={s.card}>
          <Typography variant="displayMd">Your place is being held with care.</Typography>
          <Typography variant="bodySm" lineHeight={21} mT={8}>
            A $300 deposit reserves your place on our waiting list and is applied toward the purchase price of your
            kitten. Kittens go home between 9 and 12 weeks of age. Here's a preview of how that looks.
          </Typography>
        </View>

        {kitten ? (
          <View style={styles.spaced}>
            <JourneyCard kitten={kitten} colors={colors} />
            <Typography
              size={14}
              font="bodySemiBold"
              color="copper"
              mT={12}
              onPress={() => navigation.navigate('KittenDetailScreen', { id: kitten.id })}
            >
              View {kitten.name}
            </Typography>
          </View>
        ) : null}
      </Screen>
    </View>
  );
}

function JourneyCard({ kitten, colors }) {
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [done, setDone] = useState(['Deposit conversation']);
  const pct = Math.round((done.length / ITEMS.length) * 100);

  const toggle = item => setDone(d => (d.includes(item) ? d.filter(x => x !== item) : [...d, item]));

  return (
    <View style={s.card}>
      <Photo source={kitten.photo} style={styles.photo} radius={RADIUS.md} />
      <Typography variant="displayLg" mT={8}>
        {kitten.name}
      </Typography>
      <Typography size={14}>Deposit: discussed, not yet placed</Typography>
      <Typography size={14}>Go-home window: January 2027</Typography>

      <View style={[styles.track, { backgroundColor: colors.secondary }]}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: colors.copper }]} />
      </View>
      <Typography variant="tiny" mT={4}>
        {pct}% of the go-home checklist
      </Typography>

      <View style={styles.list}>
        {ITEMS.map(item => {
          const on = done.includes(item);
          return (
            <Pressable key={item} onPress={() => toggle(item)} style={styles.check}>
              <View
                style={[
                  styles.checkbox,
                  { borderColor: on ? colors.copper : colors.borderDark, backgroundColor: on ? colors.copper : 'transparent' },
                ]}
              >
                {on ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
              </View>
              <Typography size={14} flex={1}>
                {item}
              </Typography>
            </Pressable>
          );
        })}
      </View>
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
  body: { paddingHorizontal: Sizer.hSize(20) },
  spaced: { marginTop: Sizer.vSize(16) },
  photo: { width: '100%', height: Sizer.vSize(160) },
  track: { height: Sizer.vSize(8), borderRadius: RADIUS.pill, overflow: 'hidden', marginTop: Sizer.vSize(12) },
  fill: { height: '100%', borderRadius: RADIUS.pill },
  list: { gap: Sizer.vSize(6), marginTop: Sizer.vSize(8) },
  check: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(8) },
  checkbox: {
    width: Sizer.hSize(18),
    height: Sizer.hSize(18),
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
