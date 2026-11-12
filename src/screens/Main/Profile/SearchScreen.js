import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RADIUS } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Screen, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { cats, kittens } from '../../../lib/copper-data';

/** Ported from Project/src/components/cr/profile.tsx — SearchScreen. */
export default function SearchScreen({ navigation }) {
  const colors = useColors();
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const kittenHits = query
    ? kittens.filter(k => `${k.name} ${k.coat} ${k.sex}`.toLowerCase().includes(query))
    : [];
  const catHits = query
    ? cats.filter(c => `${c.name} ${c.tagline} ${c.coat} ${c.status ?? ''}`.toLowerCase().includes(query))
    : [];

  return (
    <View style={s.root}>
      <BackBar title="Search" />
      <Screen contentStyle={styles.body}>
        <TextField autoFocus value={q} onChangeText={setQ} placeholder="Kittens, queens, care, merch" />

        <View style={styles.stack}>
          {kittenHits.map(k => (
            <Pressable
              key={k.id}
              onPress={() => navigation.navigate('KittenDetailScreen', { id: k.id })}
              style={s.row}
            >
              <Typography size={15}>
                {k.name} · {k.coat}
              </Typography>
            </Pressable>
          ))}
          {catHits.map(c => (
            <Pressable
              key={c.id}
              onPress={() => navigation.navigate('CatProfileScreen', { id: c.id })}
              style={s.row}
            >
              <Typography size={15}>{c.name}</Typography>
            </Pressable>
          ))}
          {query ? (
            <>
              <Pressable onPress={() => navigation.navigate('MainTabs', { screen: 'ShopTab' })} style={s.row}>
                <Typography size={15}>Search merch for “{q}”</Typography>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('MainTabs', { screen: 'LearnTab' })} style={s.row}>
                <Typography size={15}>Search education</Typography>
              </Pressable>
            </>
          ) : null}
        </View>
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    row: {
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      padding: Sizer.hSize(12),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(8), marginTop: Sizer.vSize(12) },
});
