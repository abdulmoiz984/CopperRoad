import React, { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { Badge, Btn, HeartBtn, Photo, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { money, productById, products, shopPerks } from '../../../lib/copper-data';
import { addToCart, selectWishlist, toggleWish } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';
import { Missing } from '../Cats/CatProfileScreen';

/** Ported from Project/src/components/cr/shop.tsx — ProductDetail. */
export default function ProductDetailScreen({ navigation, route }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);

  const product = productById(route.params?.id);
  if (!product) return <Missing navigation={navigation} />;

  const also = products.filter(p => p.id !== product.id).slice(0, 4);

  const add = () => {
    dispatch(addToCart({ productId: product.id, qty }));
    toast('Added to cart');
  };

  return (
    <View style={s.root}>
      <Screen padded={false}>
        <View>
          <Pressable onPress={() => setZoom(true)}>
            <Photo source={product.image} style={styles.hero} />
          </Pressable>
          <Pressable
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            style={[s.float, { top: Math.max(insets.top, Sizer.vSize(12)) }]}
            hitSlop={6}
          >
            <Icon name="arrow-left" size={Sizer.fS(18)} color={colors.navy} />
          </Pressable>
          <View style={[styles.heartTR, { top: Math.max(insets.top, Sizer.vSize(12)) }]}>
            <HeartBtn on={wishlist.includes(product.id)} onPress={() => dispatch(toggleWish(product.id))} />
          </View>
        </View>

        <View style={styles.body}>
          <Typography size={11} font="bodySemiBold" color="copper" letterSpacing={1.54} textTransform="uppercase">
            {product.category}
          </Typography>
          {product.tag ? (
            <View style={styles.tag}>
              <Badge tone="navy">{product.tag}</Badge>
            </View>
          ) : null}
          <Typography variant="displayLg" mT={8}>
            {product.name}
          </Typography>
          <Typography variant="displayMd" color="copper" mT={4}>
            {money(product.price)}
          </Typography>
          <Typography size={14} lineHeight={21} mT={8}>
            {product.description}
          </Typography>

          <View style={styles.qtyRow}>
            <Pressable onPress={() => setQty(Math.max(1, qty - 1))} style={s.qtyBtn}>
              <Typography size={20}>−</Typography>
            </Pressable>
            <Typography size={15} font="bodySemiBold" textAlign="center" style={styles.qtyValue}>
              {qty}
            </Typography>
            <Pressable onPress={() => setQty(qty + 1)} style={s.qtyBtn}>
              <Typography size={20}>+</Typography>
            </Pressable>
          </View>

          <Btn full title="Add to Cart" style={styles.cta} onPress={add} />
          <Btn
            full
            variant="navy"
            title="Buy Now"
            style={styles.stacked}
            onPress={() => {
              add();
              navigation.navigate('CheckoutScreen');
            }}
          />

          <Pressable onPress={() => setShipOpen(o => !o)} style={[s.panel, styles.stacked]}>
            <Typography size={14} font="bodySemiBold">
              Shipping and returns
            </Typography>
            {shipOpen ? (
              <View style={styles.panelBody}>
                {shopPerks.map(perk => (
                  <Typography key={perk.title} variant="bodySm" lineHeight={21}>
                    <Typography size={14} font="bodySemiBold">
                      {perk.title}.
                    </Typography>{' '}
                    {perk.text}
                  </Typography>
                ))}
              </View>
            ) : null}
          </Pressable>

          <Typography variant="displayMd" mT={20}>
            You May Also Like
          </Typography>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.alsoRow}>
          {also.map(p => (
            <Pressable
              key={p.id}
              onPress={() => navigation.push('ProductDetailScreen', { id: p.id })}
              style={s.alsoCard}
            >
              <Photo source={p.image} style={styles.alsoPhoto} />
              <Typography size={14} style={styles.alsoName}>
                {p.name}
              </Typography>
            </Pressable>
          ))}
        </ScrollView>
      </Screen>

      <Modal visible={zoom} transparent={false} animationType="fade" onRequestClose={() => setZoom(false)}>
        <Pressable style={[styles.zoom, { backgroundColor: colors.navy }]} onPress={() => setZoom(false)}>
          <Image source={product.image} resizeMode="contain" style={styles.zoomImage} />
        </Pressable>
      </Modal>
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
    qtyBtn: {
      width: Sizer.hSize(44),
      height: Sizer.hSize(44),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RADIUS.sm,
      backgroundColor: colors.card,
    },
    panel: {
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
    alsoCard: {
      width: Sizer.hSize(144),
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  hero: { width: '100%', aspectRatio: 41 / 34 },
  heartTR: { position: 'absolute', right: Sizer.hSize(12) },
  body: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(16) },
  tag: { marginTop: Sizer.vSize(8) },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(12), marginTop: Sizer.vSize(16) },
  qtyValue: { width: Sizer.hSize(32) },
  cta: { marginTop: Sizer.vSize(16) },
  stacked: { marginTop: Sizer.vSize(10) },
  panelBody: { gap: Sizer.vSize(8), marginTop: Sizer.vSize(8) },
  alsoRow: { gap: Sizer.hSize(12), paddingHorizontal: Sizer.hSize(20), paddingBottom: Sizer.vSize(8) },
  alsoPhoto: { width: '100%', height: Sizer.vSize(112) },
  alsoName: { padding: Sizer.hSize(8) },
  zoom: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  zoomImage: { width: '100%', height: '100%' },
});
