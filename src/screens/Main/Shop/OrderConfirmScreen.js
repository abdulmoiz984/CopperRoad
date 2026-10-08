import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { Btn, Pop } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { money } from '../../../lib/copper-data';
import { selectOrders } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/shop.tsx — OrderConfirm. */
export default function OrderConfirmScreen({ navigation, route }) {
  const colors = useColors();
  const orders = useSelector(selectOrders);
  const orderId = route.params?.orderId;
  const order = orders.find(o => o.id === orderId);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Pop>
        <View style={[styles.mark, { backgroundColor: colors.tonegreenBg }]}>
          <Icon name="check" size={Sizer.fS(36)} color={colors.tonegreenFg} />
        </View>
      </Pop>

      <View style={styles.paws}>
        <Icon name="paw-print" size={Sizer.fS(20)} color={colors.copper} />
        <Icon name="paw-print" size={Sizer.fS(20)} color={colors.copper} />
      </View>

      <Typography size={36} font="displaySemiBold" textAlign="center">
        Order placed
      </Typography>
      <Typography variant="bodySm" textAlign="center" mT={4}>
        {orderId}
      </Typography>
      {order ? (
        <Typography size={14} textAlign="center" mT={8}>
          {money(order.total)} · {order.method}
        </Typography>
      ) : null}

      <View style={styles.actions}>
        <Btn full title="Track Order" onPress={() => navigation.navigate('OrderDetailScreen', { id: orderId })} />
        <Btn
          full
          variant="outline"
          title="Continue Shopping"
          onPress={() => navigation.navigate('MainTabs', { screen: 'ShopTab' })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Sizer.hSize(24) },
  mark: {
    width: Sizer.hSize(80),
    height: Sizer.hSize(80),
    borderRadius: Sizer.hSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paws: { flexDirection: 'row', gap: Sizer.hSize(8), marginVertical: Sizer.vSize(12) },
  actions: { width: '100%', gap: Sizer.vSize(8), marginTop: Sizer.vSize(24) },
});
