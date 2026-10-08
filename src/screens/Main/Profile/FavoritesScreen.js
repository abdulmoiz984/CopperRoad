import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Empty, Photo, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { cats, kittenById } from '../../../lib/copper-data';
import { selectFavCats, selectFavKittens } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/profile.tsx — Favorites. */
export default function FavoritesScreen({ navigation }) {
  const colors = useColors();
  const favCats = useSelector(selectFavCats);
  const favKittens = useSelector(selectFavKittens);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const kittenCards = favKittens.map(id => kittenById(id)).filter(Boolean);
  const catCards = favCats.map(id => cats.find(c => c.id === id)).filter(Boolean);
  const empty = !kittenCards.length && !catCards.length;

  return (
    <View style={s.root}>
      <BackBar title="Favorites" />
      {empty ? (
        <Empty title="No favorites yet" body="Hearts on kittens and cats live here." />
      ) : (
        <Screen padded={false} contentStyle={styles.body}>
          <View style={styles.grid}>
            {kittenCards.map(k => (
              <Pressable
                key={k.id}
                onPress={() => navigation.navigate('KittenDetailScreen', { id: k.id })}
                style={({ pressed }) => [s.card, { opacity: pressed ? 0.92 : 1 }]}
              >
                <Photo source={k.photo} style={styles.photo} />
                <Typography variant="displaySm" style={styles.name}>
                  {k.name}
                </Typography>
              </Pressable>
            ))}
            {catCards.map(c => (
              <Pressable
                key={c.id}
                onPress={() => navigation.navigate('CatProfileScreen', { id: c.id })}
                style={({ pressed }) => [s.card, { opacity: pressed ? 0.92 : 1 }]}
              >
                <Photo source={c.photo} style={styles.photo} />
                <Typography variant="displaySm" style={styles.name}>
                  {c.short}
                </Typography>
              </Pressable>
            ))}
          </View>
        </Screen>
      )}
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    card: {
      width: '48%',
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(12) },
  photo: { width: '100%', aspectRatio: 1 },
  name: { padding: Sizer.hSize(8) },
});
