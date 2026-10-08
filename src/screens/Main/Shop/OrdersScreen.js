import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Badge, Btn, Empty, Screen, statusTone } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { money } from '../../../lib/copper-data';
import { selectOrders } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/shop.tsx — OrdersScreen. */
export default function OrdersScreen({ navigation }) {
  const colors = useColors();
  const orders = useSelector(selectOrders);
  const s = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={s.root}>
      <BackBar title="My Orders" />
      <Screen contentStyle={styles.body}>
        {!orders.length ? (
          <Empty
            title="No orders yet"
            body="Anything you order will show up here."
            action={<Btn full title="Browse merch" onPress={() => navigation.navigate('MainTabs', { screen: 'ShopTab' })} />}
          />
        ) : (
          <View style={styles.stack}>
            {orders.map(o => (
              <Pressable
                key={o.id}
                onPress={() => navigation.navigate('OrderDetailScreen', { id: o.id })}
                style={({ pressed }) => [s.card, { opacity: pressed ? 0.92 : 1 }]}
              >
                <View style={styles.headRow}>
                  <Typography size={15} font="bodySemiBold" flex={1}>
                    {o.id}
                  </Typography>
                  <Badge tone={statusTone(o.status)}>{o.status}</Badge>
                </View>
                <Typography variant="bodySm" mT={4}>
                  {o.createdAt}
                </Typography>
                <Typography size={15} color="copper">
                  {money(o.total)}
                </Typography>
              </Pressable>
            ))}
          </View>
        )}
      </Screen>
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
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(12) },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(8) },
});
