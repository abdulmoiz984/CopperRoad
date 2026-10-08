import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Empty, Photo, Screen, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { money, productById } from '../../../lib/copper-data';
import { removeLine, selectCart, setQty } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/shop.tsx — CartScreen. */
export default function CartScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [code, setCode] = useState('');
  const [off, setOff] = useState(0);
  const [err, setErr] = useState('');

  const sub = cart.reduce((n, l) => n + (productById(l.productId)?.price || 0) * l.qty, 0);
  const ship = sub === 0 || sub >= 75 ? 0 : 8;
  const tax = (sub - off) * 0.065;
  const total = Math.max(0, sub - off) + ship + tax;

  if (!cart.length) {
    return (
      <View style={s.root}>
        <BackBar title="Cart" />
        <Empty
          title="Your cart is quiet"
          body="The tees and hoodies are waiting."
          action={<Btn full title="Continue Shopping" onPress={() => navigation.navigate('MainTabs', { screen: 'ShopTab' })} />}
        />
      </View>
    );
  }

  return (
    <View style={s.root}>
      <BackBar title="Cart" />
      <Screen contentStyle={styles.body}>
        <View style={styles.stack}>
          {cart.map(line => {
            const p = productById(line.productId);
            if (!p) return null;
            return (
              <View key={line.key} style={s.row}>
                <Photo source={p.image} style={styles.rowPhoto} radius={RADIUS.md} />
                <View style={styles.flex}>
                  <Typography size={15} font="bodySemiBold" lineHeight={20}>
                    {p.name}
                  </Typography>
                  <Typography variant="tiny">{p.category}</Typography>
                  <View style={styles.qtyRow}>
                    <Pressable
                      onPress={() => dispatch(setQty({ key: line.key, qty: line.qty - 1 }))}
                      style={[s.qtyBtn, { backgroundColor: colors.secondary }]}
                    >
                      <Typography size={16}>−</Typography>
                    </Pressable>
                    <Typography size={15}>{line.qty}</Typography>
                    <Pressable
                      onPress={() => dispatch(setQty({ key: line.key, qty: line.qty + 1 }))}
                      style={[s.qtyBtn, { backgroundColor: colors.secondary }]}
                    >
                      <Typography size={16}>+</Typography>
                    </Pressable>
                    <Typography
                      size={12}
                      color={colors.dangerText}
                      style={styles.remove}
                      onPress={() => dispatch(removeLine(line.key))}
                    >
                      Remove
                    </Typography>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.promoRow}>
          <View style={styles.flex}>
            <TextField value={code} onChangeText={setCode} placeholder="Promo code" autoCapitalize="characters" />
          </View>
          <Btn
            title="Apply"
            onPress={() => {
              if (code.trim().toUpperCase() === 'FAMILY10') {
                setOff(sub * 0.1);
                setErr('');
              } else {
                setErr('Try FAMILY10');
              }
            }}
          />
        </View>
        {err ? (
          <Typography size={12} color={colors.dangerText}>
            {err}
          </Typography>
        ) : null}
        {off > 0 ? (
          <Typography size={14} color="successText">
            Family discount applied
          </Typography>
        ) : null}

        <View style={s.summary}>
          <Sum k="Subtotal" v={money(sub)} />
          <Sum k="Shipping" v={ship === 0 ? 'Free' : money(ship)} />
          <Sum k="Tax" v={money(tax)} />
          <Sum k="Total" v={money(total)} strong />
        </View>

        <Btn full title="Proceed to Checkout" style={styles.cta} onPress={() => navigation.navigate('CheckoutScreen')} />
      </Screen>
    </View>
  );
}

function Sum({ k, v, strong }) {
  return (
    <View style={styles.sumRow}>
      {strong ? (
        <>
          <Typography variant="displaySm">{k}</Typography>
          <Typography variant="displaySm" color="copper">
            {v}
          </Typography>
        </>
      ) : (
        <>
          <Typography size={14}>{k}</Typography>
          <Typography size={14}>{v}</Typography>
        </>
      )}
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    row: {
      flexDirection: 'row',
      gap: Sizer.hSize(12),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(8),
      ...softShadow(colors),
    },
    qtyBtn: {
      width: Sizer.hSize(36),
      height: Sizer.hSize(36),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RADIUS.sm,
    },
    summary: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      marginTop: Sizer.vSize(12),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(12) },
  rowPhoto: { width: Sizer.hSize(80), height: Sizer.hSize(80) },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(8), marginTop: Sizer.vSize(4) },
  remove: { marginLeft: 'auto' },
  promoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Sizer.hSize(8), marginTop: Sizer.vSize(12) },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Sizer.vSize(4) },
  cta: { marginTop: Sizer.vSize(12) },
});
