import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { money, productById } from '../../../lib/copper-data';
import { addToCart, selectOrders } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';
import { Missing } from '../Cats/CatProfileScreen';

const TIMELINE = ['Processing', 'Shipped', 'Delivered'];

/** Ported from Project/src/components/cr/shop.tsx — OrderDetail. */
export default function OrderDetailScreen({ navigation, route }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const order = orders.find(o => o.id === route.params?.id);

  if (!order) return <Missing navigation={navigation} />;
  const at = TIMELINE.indexOf(order.status);

  const reorder = () => {
    order.lines.forEach(l => dispatch(addToCart({ productId: l.productId, qty: l.qty })));
    toast('Items added back to your cart');
    navigation.navigate('CartScreen');
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title={order.id} subtitle={order.status} />
      <Screen contentStyle={styles.body}>
        <View style={[styles.timeline, { borderLeftColor: colors.copper }]}>
          {TIMELINE.map((label, i) => (
            <View key={label}>
              <Typography
                size={15}
                font={i <= at ? 'bodySemiBold' : 'bodyRegular'}
                color={i <= at ? 'foreground' : 'mutedForeground'}
              >
                {label}
              </Typography>
              <Typography variant="tiny">{i <= at ? order.createdAt : 'Upcoming'}</Typography>
            </View>
          ))}
        </View>

        <Typography size={14} mT={16}>
          {order.address}
        </Typography>
        <Typography variant="bodySm">{order.method}</Typography>

        <View style={styles.lines}>
          {order.lines.map(l => (
            <Typography key={l.key} size={14}>
              {productById(l.productId)?.name} × {l.qty}
            </Typography>
          ))}
        </View>

        <Typography variant="displayMd" color="copper" mT={8}>
          {money(order.total)}
        </Typography>

        <Btn full title="Reorder" style={styles.cta} onPress={reorder} />
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20) },
  timeline: { gap: Sizer.vSize(12), borderLeftWidth: 2, paddingLeft: Sizer.hSize(16) },
  lines: { gap: Sizer.vSize(4), marginTop: Sizer.vSize(12) },
  cta: { marginTop: Sizer.vSize(16) },
});
