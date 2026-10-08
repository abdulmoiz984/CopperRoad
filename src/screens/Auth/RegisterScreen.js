import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RADIUS } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import Icon from '../../helpers/Icon';
import { FormController, Typography } from '../../atomComponents';
import { Btn, Field, PasswordField, Screen, SelectField, TextField } from '../../components';
import { useColors } from '../../hooks/useTheme';
import { useCustomMutation } from '../../query';
import { register } from '../../api/authService';
import { onAuthSuccess } from '../../query/partials/responseManager';
import { registerSchema } from '../../validations';
import { US_STATES, hearAbout } from '../../lib/copper-data';
import AuthHeader, { StatusScrim } from './AuthHeader';

const CODES = ['+1', '+44', '+61', '+52'];
const CODE_LABELS = { '+1': 'US/CA +1', '+44': 'UK +44', '+61': 'AU +61', '+52': 'MX +52' };

/** The web's four-segment strength meter. */
function strengthOf(password = '') {
  return Math.min(
    4,
    [password.length >= 6, /[A-Z]/.test(password), /[0-9]/.test(password), password.length >= 10].filter(Boolean).length,
  );
}

/** Ported from Project/src/components/cr/auth.tsx — Register. */
export default function RegisterScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const [code, setCode] = useState('+1');

  const { mutate, isPending } = useCustomMutation({
    mutationFn: register,
    // A fresh registration lands on Welcome, as it does on the web.
    onSuccess: (response, variables) =>
      onAuthSuccess(response, navigation, dispatch, {
        credentials: { email: variables.email, password: variables.password },
        destination: 'WelcomeScreen',
      }),
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <Screen padded={false}>
        <AuthHeader title="Join The Copper Road Family" sub="Create an account to apply, save favorites, and shop." />

        <View style={styles.body}>
          <FormController
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              password: '',
              confirm: '',
              city: '',
              state: 'SD',
              zip: '',
              hear: '',
              adopting: 'Yes',
              agreed: false,
              updates: true,
            }}
            validationSchema={registerSchema}
            onSubmit={values => mutate({ ...values, phone: `${code} ${values.phone}` })}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <>
                <View style={styles.pair}>
                  <View style={styles.half}>
                    <Field label="First Name" error={errors.firstName}>
                      <TextField
                        icon="user"
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                      />
                    </Field>
                  </View>
                  <View style={styles.half}>
                    <Field label="Last Name" error={errors.lastName}>
                      <TextField
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                      />
                    </Field>
                  </View>
                </View>

                <Field label="Email Address" error={errors.email}>
                  <TextField
                    icon="mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Field>

                <Field label="Phone Number" error={errors.phone}>
                  <View style={styles.phoneRow}>
                    <View style={styles.code}>
                      <SelectField
                        value={CODE_LABELS[code]}
                        options={CODES.map(c => CODE_LABELS[c])}
                        onChange={label => setCode(CODES.find(c => CODE_LABELS[c] === label) ?? '+1')}
                      />
                    </View>
                    <View style={styles.flex}>
                      <TextField
                        icon="phone"
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        placeholder="605 630 3008"
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>
                </Field>

                <Field label="Password" error={errors.password}>
                  <PasswordField
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <View style={styles.meter}>
                    {[0, 1, 2, 3].map(n => (
                      <View
                        key={n}
                        style={[
                          styles.meterBar,
                          { backgroundColor: n < strengthOf(values.password) ? colors.copper : colors.border },
                        ]}
                      />
                    ))}
                  </View>
                </Field>

                <Field label="Confirm Password" error={errors.confirm}>
                  <PasswordField
                    value={values.confirm}
                    onChangeText={handleChange('confirm')}
                    onBlur={handleBlur('confirm')}
                  />
                </Field>

                <Field label="City" error={errors.city}>
                  <TextField value={values.city} onChangeText={handleChange('city')} onBlur={handleBlur('city')} />
                </Field>

                <View style={styles.pair}>
                  <View style={styles.half}>
                    <Field label="State" error={errors.state}>
                      <SelectField
                        value={values.state}
                        options={US_STATES}
                        onChange={v => setFieldValue('state', v)}
                      />
                    </Field>
                  </View>
                  <View style={styles.half}>
                    <Field label="Zip Code" error={errors.zip}>
                      <TextField
                        value={values.zip}
                        onChangeText={handleChange('zip')}
                        onBlur={handleBlur('zip')}
                        keyboardType="number-pad"
                      />
                    </Field>
                  </View>
                </View>

                <Field label="How did you hear about us?">
                  <SelectField
                    value={values.hear}
                    options={hearAbout}
                    placeholder="Choose one"
                    onChange={v => setFieldValue('hear', v)}
                  />
                </Field>

                <Field label="Are you interested in adopting a kitten?">
                  <View style={styles.segment}>
                    {['Yes', 'Maybe later'].map(opt => {
                      const on = values.adopting === opt;
                      return (
                        <Pressable
                          key={opt}
                          onPress={() => setFieldValue('adopting', opt)}
                          style={[
                            styles.segmentBtn,
                            { backgroundColor: on ? colors.chipActiveBg : colors.card },
                          ]}
                        >
                          <Typography size={14} font="bodySemiBold" color={on ? colors.chipActiveFg : colors.foreground}>
                            {opt}
                          </Typography>
                        </Pressable>
                      );
                    })}
                  </View>
                </Field>

                <Pressable onPress={() => setFieldValue('agreed', !values.agreed)} style={styles.check}>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        borderColor: values.agreed ? colors.copper : colors.borderDark,
                        backgroundColor: values.agreed ? colors.copper : 'transparent',
                      },
                    ]}
                  >
                    {values.agreed ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
                  </View>
                  <Typography size={14} flex={1} lineHeight={20}>
                    I agree to the{' '}
                    <Typography
                      size={14}
                      font="bodySemiBold"
                      color="copper"
                      onPress={() => navigation.navigate('LegalScreen', { doc: 'terms' })}
                    >
                      Terms &amp; Conditions
                    </Typography>{' '}
                    and{' '}
                    <Typography
                      size={14}
                      font="bodySemiBold"
                      color="copper"
                      onPress={() => navigation.navigate('LegalScreen', { doc: 'privacy' })}
                    >
                      Privacy Policy
                    </Typography>
                  </Typography>
                </Pressable>
                {errors.agreed ? (
                  <Typography size={12} color={colors.dangerText} mB={8}>
                    {errors.agreed}
                  </Typography>
                ) : null}

                <Pressable onPress={() => setFieldValue('updates', !values.updates)} style={styles.check}>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        borderColor: values.updates ? colors.copper : colors.borderDark,
                        backgroundColor: values.updates ? colors.copper : 'transparent',
                      },
                    ]}
                  >
                    {values.updates ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
                  </View>
                  <Typography size={14} flex={1}>
                    Send me kitten availability updates
                  </Typography>
                </Pressable>

                <Btn full title="Create Account" loading={isPending} style={styles.cta} onPress={handleSubmit} />
              </>
            )}
          </FormController>

          <View style={styles.loginRow}>
            <Typography size={14}>Already have an account? </Typography>
            <Typography
              size={14}
              font="bodySemiBold"
              color="copper"
              onPress={() => navigation.navigate('LoginScreen')}
            >
              Log In
            </Typography>
          </View>
        </View>
      </Screen>
      <StatusScrim />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(24) },
  pair: { flexDirection: 'row', gap: Sizer.hSize(12) },
  half: { flex: 1 },
  phoneRow: { flexDirection: 'row', gap: Sizer.hSize(8) },
  code: { width: Sizer.hSize(124) },
  meter: { flexDirection: 'row', gap: Sizer.hSize(4), marginTop: Sizer.vSize(8) },
  meterBar: { flex: 1, height: Sizer.vSize(6), borderRadius: RADIUS.pill },
  segment: { flexDirection: 'row', gap: Sizer.hSize(8) },
  segmentBtn: {
    flex: 1,
    minHeight: Sizer.vSize(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
  },
  check: { flexDirection: 'row', alignItems: 'flex-start', gap: Sizer.hSize(10), marginBottom: Sizer.vSize(12) },
  checkbox: {
    width: Sizer.hSize(18),
    height: Sizer.hSize(18),
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizer.vSize(2),
  },
  cta: { marginTop: Sizer.vSize(8) },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Sizer.vSize(16) },
});
