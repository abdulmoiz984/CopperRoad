import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Field, Screen, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { createOrder } from '../../../api/shopService';
import { money, productById } from '../../../lib/copper-data';
import { placeOrder, selectCart, selectUser } from '../../../redux/slices/appSlice';
import { orderId as makeOrderId } from '../../../utils';

const STEPS = ['Shipping', 'Delivery', 'Payment', 'Review'];

/** Ported from Project/src/components/cr/shop.tsx — Checkout. */
export default function CheckoutScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: user && !user.guest ? `${user.firstName} ${user.lastName}` : '',
    email: user?.guest ? '' : user?.email || '',
    phone: user?.guest ? '' : user?.phone || '',
    line1: '',
    line2: '',
    city: user?.city || '',
    state: user?.state || 'SD',
    zip: user?.zip || '',
    country: 'United States',
    save: true,
    method: 'Standard',
    card: '',
    cardName: '',
    exp: '',
    cvv: '',
    same: true,
    terms: false,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const { mutate: syncOrder } = useCustomMutation({ mutationFn: createOrder });

  const sub = cart.reduce((n, l) => n + (productById(l.productId)?.price || 0) * l.qty, 0);
  const ship = form.method === 'Express' ? 18 : sub >= 75 ? 0 : 8;
  const total = sub + ship + sub * 0.065;

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const id = makeOrderId();
    const order = {
      id,
      lines: cart,
      total,
      address: `${form.name}, ${form.line1}, ${form.city}, ${form.state} ${form.zip}`,
      method: form.method,
    };
    dispatch(placeOrder(order));
    syncOrder(order);
    navigation.navigate('OrderConfirmScreen', { orderId: id });
  };

  return (
    <View style={s.root}>
      <BackBar title="Checkout" subtitle={`Step ${step + 1} of 4 · ${STEPS[step]}`} />
      <View style={styles.progress}>
        {STEPS.map((label, i) => (
          <View
            key={label}
            style={[styles.progressBar, { backgroundColor: i <= step ? colors.copper : colors.border }]}
          />
        ))}
      </View>

      <Screen contentStyle={styles.body}>
        {step === 0 ? (
          <>
            <Field label="Full Name">
              <TextField value={form.name} onChangeText={v => set('name', v)} />
            </Field>
            <Field label="Email">
              <TextField value={form.email} onChangeText={v => set('email', v)} keyboardType="email-address" autoCapitalize="none" />
            </Field>
            <Field label="Phone">
              <TextField value={form.phone} onChangeText={v => set('phone', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Address Line 1">
              <TextField value={form.line1} onChangeText={v => set('line1', v)} />
            </Field>
            <Field label="Address Line 2">
              <TextField value={form.line2} onChangeText={v => set('line2', v)} />
            </Field>
            <Field label="City">
              <TextField value={form.city} onChangeText={v => set('city', v)} />
            </Field>
            <View style={styles.pair}>
              <View style={styles.flex}>
                <Field label="State">
                  <TextField value={form.state} onChangeText={v => set('state', v)} />
                </Field>
              </View>
              <View style={styles.flex}>
                <Field label="Zip">
                  <TextField value={form.zip} onChangeText={v => set('zip', v)} keyboardType="number-pad" />
                </Field>
              </View>
            </View>
            <Field label="Country">
              <TextField value={form.country} onChangeText={v => set('country', v)} />
            </Field>
            <Check on={form.save} label="Save address" onPress={() => set('save', !form.save)} />
          </>
        ) : null}

        {step === 1 ? (
          <View style={styles.stack}>
            {[
              ['Standard', sub >= 75 ? 'Free' : '$8.00', '5–7 business days'],
              ['Express', '$18.00', '2–3 business days'],
            ].map(([name, price, eta]) => {
              const on = form.method === name;
              return (
                <Pressable
                  key={name}
                  onPress={() => set('method', name)}
                  style={[s.option, on && { borderColor: colors.copper, borderWidth: 2 }]}
                >
                  <Typography size={15} font="bodySemiBold">
                    {name} · {price}
                  </Typography>
                  <Typography variant="bodySm">{eta}</Typography>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {step === 2 ? (
          <>
            <Field label="Card Number">
              <TextField
                value={form.card}
                onChangeText={v => set('card', v)}
                placeholder="4242 4242 4242 4242"
                keyboardType="number-pad"
              />
            </Field>
            <Field label="Name on Card">
              <TextField value={form.cardName} onChangeText={v => set('cardName', v)} />
            </Field>
            <View style={styles.pair}>
              <View style={styles.flex}>
                <Field label="Expiry">
                  <TextField value={form.exp} onChangeText={v => set('exp', v)} placeholder="MM/YY" />
                </Field>
              </View>
              <View style={styles.flex}>
                <Field label="CVV">
                  <TextField value={form.cvv} onChangeText={v => set('cvv', v)} placeholder="123" keyboardType="number-pad" />
                </Field>
              </View>
            </View>
            <Check on={form.same} label="Billing same as shipping" onPress={() => set('same', !form.same)} />
          </>
        ) : null}

        {step === 3 ? (
          <View style={styles.review}>
            {cart.map(l => {
              const p = productById(l.productId);
              return (
                <Typography key={l.key} size={14}>
                  {p?.name} · {p?.category} × {l.qty}
                </Typography>
              );
            })}
            <Typography size={14}>
              {form.name}, {form.line1}, {form.city} {form.state} {form.zip}
            </Typography>
            <Typography size={14}>{form.method} · Card</Typography>
            <Typography variant="displayMd" color="copper">
              {money(total)}
            </Typography>
            <Check
              on={form.terms}
              label="I agree to the Terms & Conditions"
              onPress={() => set('terms', !form.terms)}
            />
          </View>
        ) : null}

        <View style={styles.actions}>
          {step > 0 ? (
            <View style={styles.flex}>
              <Btn full variant="outline" title="Back" onPress={() => setStep(step - 1)} />
            </View>
          ) : null}
          <View style={styles.flex}>
            <Btn full title={step === 3 ? 'Place Order' : 'Next'} onPress={next} />
          </View>
        </View>
      </Screen>
    </View>
  );
}

/** Hoisted: defining it inside the screen remounts it on every keystroke. */
function Check({ on, label, onPress }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={styles.check}>
      <View
        style={[
          styles.checkbox,
          { borderColor: on ? colors.copper : colors.borderDark, backgroundColor: on ? colors.copper : 'transparent' },
        ]}
      >
        {on ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
      </View>
      <Typography size={14} flex={1}>
        {label}
      </Typography>
    </Pressable>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    option: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: 'transparent',
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  progress: { flexDirection: 'row', gap: Sizer.hSize(4), paddingHorizontal: Sizer.hSize(16) },
  progressBar: { flex: 1, height: Sizer.vSize(6), borderRadius: RADIUS.pill },
  body: { paddingHorizontal: Sizer.hSize(16), paddingTop: Sizer.vSize(16) },
  pair: { flexDirection: 'row', gap: Sizer.hSize(8) },
  stack: { gap: Sizer.vSize(8) },
  review: { gap: Sizer.vSize(8) },
  check: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(10), marginBottom: Sizer.vSize(12) },
  checkbox: {
    width: Sizer.hSize(18),
    height: Sizer.hSize(18),
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(12) },
});
