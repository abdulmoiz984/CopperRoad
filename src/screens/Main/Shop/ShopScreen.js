import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import {
  Badge,
  Chip,
  Field,
  HeartBtn,
  Photo,
  Screen,
  SelectField,
  Sheet,
  Slider,
  TextField,
} from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { money, products, shopCategories, shopPerks } from '../../../lib/copper-data';
import { addToCart, selectWishlist, toggleWish } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';

const SORTS = ['Featured', 'Price Low–High', 'High–Low', 'Newest'];

/** Ported from Project/src/components/cr/shop.tsx — ShopScreen. */
export default function ShopScreen({ navigation }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [max, setMax] = useState(58);

  const list = useMemo(() => {
    let rows = products.filter(
      p =>
        (category === 'All' || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        p.price <= max,
    );
    if (sort === 'Price Low–High') rows = [...rows].sort((a, b) => a.price - b.price);
    if (sort === 'High–Low') rows = [...rows].sort((a, b) => b.price - a.price);
    if (sort === 'Newest') rows = [...rows].reverse();
    return rows;
  }, [query, category, sort, max]);

  const add = id => {
    dispatch(addToCart({ productId: id }));
    toast('Added to cart');
  };

  const featured = products[0];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <View style={[s.header, { paddingTop: Math.max(insets.top, Sizer.vSize(16)) + Sizer.vSize(8) }]}>
        <Typography size={11} font="bodySemiBold" color="copper" letterSpacing={1.98} textTransform="uppercase">
          Copper Road Wear &amp; Accents
        </Typography>
        <Typography size={36} lineHeight={36} font="displaySemiBold" color="#FFFFFF" mT={2}>
          CATTERY MERCHANDISE
        </Typography>
        <Typography size={14} lineHeight={21} color="rgba(255,255,255,0.75)" mT={8}>
          All proceeds go directly back into our veterinary health testing program, certified organic nutrition, and
          high-quality play structures for our kittens.
        </Typography>
      </View>

      <Screen padded={false} tabPad>
        <View style={styles.body}>
          <TextField value={query} onChangeText={setQuery} placeholder="Search merchandise" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {shopCategories.map(c => (
            <Chip key={c} active={category === c} onPress={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
          <Pressable onPress={() => setFilterOpen(true)} style={s.filterBtn}>
            <Icon name="sliders-horizontal" size={Sizer.fS(16)} color={colors.foreground} />
          </Pressable>
        </ScrollView>

        <View style={styles.body}>
          <SelectField value={sort} options={SORTS} onChange={setSort} />

          {/* The navy featured card */}
          <Pressable
            onPress={() => navigation.navigate('ProductDetailScreen', { id: featured.id })}
            style={[s.featured, { backgroundColor: colors.navy }]}
          >
            <Photo source={featured.image} style={styles.featuredPhoto} />
            <View style={styles.featuredBody}>
              <Typography size={12} color="copper" letterSpacing={1.5} textTransform="uppercase">
                {featured.tag}
              </Typography>
              <Typography variant="displayMd" color="#FFFFFF" mT={2}>
                {featured.name}
              </Typography>
              <Typography size={14} color="rgba(255,255,255,0.80)">
                {money(featured.price)}
              </Typography>
            </View>
          </Pressable>

          <View style={styles.grid}>
            {list.map(p => (
              <View key={p.id} style={s.card}>
                <Pressable onPress={() => navigation.navigate('ProductDetailScreen', { id: p.id })}>
                  <Photo source={p.image} style={styles.cardPhoto} />
                  {p.tag ? (
                    <View style={styles.badgeTL}>
                      <Badge tone="navy">{p.tag}</Badge>
                    </View>
                  ) : null}
                  <View style={styles.heartTR}>
                    <HeartBtn on={wishlist.includes(p.id)} onPress={() => dispatch(toggleWish(p.id))} />
                  </View>
                </Pressable>
                <View style={styles.cardBody}>
                  <Typography size={11} font="bodySemiBold" color="copper" letterSpacing={1.32} textTransform="uppercase">
                    {p.category}
                  </Typography>
                  <Typography variant="displaySm" lineHeight={22} mT={2}>
                    {p.name}
                  </Typography>
                  <Typography size={14} font="bodySemiBold" color="copper">
                    {money(p.price)}
                  </Typography>
                  <Pressable onPress={() => add(p.id)} style={[styles.addBtn, { backgroundColor: colors.copper }]}>
                    <Typography size={12} font="bodySemiBold" color={colors.navy}>
                      Add to Cart
                    </Typography>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.perks}>
            {shopPerks.map(perk => (
              <View key={perk.title} style={s.perk}>
                <Typography variant="displaySm" lineHeight={22}>
                  {perk.title}
                </Typography>
                <Typography size={12} lineHeight={18} color="mutedForeground" mT={4}>
                  {perk.text}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </Screen>

      <Sheet open={filterOpen} title="Filter Products" onClose={() => setFilterOpen(false)}>
        <Field label="Collections">
          <View style={styles.sheetChips}>
            {shopCategories.map(c => (
              <Chip key={c} active={category === c} onPress={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </View>
        </Field>
        <Field label={`Price up to ${money(max)}`}>
          <Slider value={max} min={10} max={58} onChange={setMax} />
        </Field>
      </Sheet>
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
    filterBtn: {
      width: Sizer.hSize(44),
      height: Sizer.vSize(36),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RADIUS.pill,
      backgroundColor: colors.card,
      ...softShadow(colors),
    },
    featured: { borderRadius: RADIUS.xxxl, overflow: 'hidden', marginTop: Sizer.vSize(12) },
    card: {
      width: '48%',
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
    perk: {
      width: '48%',
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      padding: Sizer.hSize(12),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16), paddingTop: Sizer.vSize(12) },
  chips: { gap: Sizer.hSize(8), paddingHorizontal: Sizer.hSize(16), paddingVertical: Sizer.vSize(12) },
  featuredPhoto: { width: '100%', height: Sizer.vSize(160) },
  featuredBody: { padding: Sizer.hSize(16) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(12), marginTop: Sizer.vSize(12) },
  cardPhoto: { width: '100%', aspectRatio: 41 / 34 },
  cardBody: { padding: Sizer.hSize(12) },
  badgeTL: { position: 'absolute', left: Sizer.hSize(8), top: Sizer.vSize(8) },
  heartTR: { position: 'absolute', right: Sizer.hSize(8), top: Sizer.vSize(8) },
  addBtn: {
    height: Sizer.vSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.sm,
    marginTop: Sizer.vSize(8),
  },
  perks: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8), marginTop: Sizer.vSize(12) },
  sheetChips: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8) },
});
