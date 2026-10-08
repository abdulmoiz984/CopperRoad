import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Empty, Photo, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { products } from '../../../lib/copper-data';
import { selectWishlist } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/shop.tsx — Wishlist. */
export default function WishlistScreen({ navigation }) {
  const colors = useColors();
  const wishlist = useSelector(selectWishlist);
  const s = useMemo(() => makeStyles(colors), [colors]);
  const items = products.filter(p => wishlist.includes(p.id));

  return (
    <View style={s.root}>
      <BackBar title="Wishlist" />
      {!items.length ? (
        <Empty
          title="Nothing saved yet"
          body="Tap the heart on a tee or hoodie."
          action={<Btn full title="Browse merch" onPress={() => navigation.navigate('MainTabs', { screen: 'ShopTab' })} />}
        />
      ) : (
        <Screen padded={false} contentStyle={styles.body}>
          <View style={styles.grid}>
            {items.map(p => (
              <Pressable
                key={p.id}
                onPress={() => navigation.navigate('ProductDetailScreen', { id: p.id })}
                style={({ pressed }) => [s.card, { opacity: pressed ? 0.92 : 1 }]}
              >
                <Photo source={p.image} style={styles.photo} />
                <Typography variant="displaySm" lineHeight={22} style={styles.name}>
                  {p.name}
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
  photo: { width: '100%', aspectRatio: 41 / 34 },
  name: { padding: Sizer.hSize(12) },
});
