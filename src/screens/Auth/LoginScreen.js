import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Sizer from '../../helpers/Sizer';
import Icon from '../../helpers/Icon';
import { FormController, Typography } from '../../atomComponents';
import { Btn, Field, PasswordField, Screen, TextField } from '../../components';
import { useColors } from '../../hooks/useTheme';
import { useCustomMutation } from '../../query';
import { continueAsGuest, login, loginSocial } from '../../api/authService';
import { onAuthSuccess } from '../../query/partials/responseManager';
import { loginSchema } from '../../validations';
import AuthHeader, { StatusScrim } from './AuthHeader';

/** Ported from Project/src/components/cr/auth.tsx — Login. */
export default function LoginScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(true);

  const settle = credentials => ({
    onSuccess: response => onAuthSuccess(response, navigation, dispatch, { credentials }),
  });

  const { mutate: doLogin, isPending } = useCustomMutation({
    mutationFn: login,
    onSuccess: (response, variables) =>
      onAuthSuccess(response, navigation, dispatch, { credentials: remember ? variables : {} }),
  });
  const { mutate: doSocial } = useCustomMutation({ mutationFn: loginSocial, ...settle({}) });
  const { mutate: doGuest } = useCustomMutation({ mutationFn: continueAsGuest, ...settle({}) });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <Screen padded={false}>
        <AuthHeader title="Welcome Back" sub="Log in to manage your applications and orders." />

        <View style={styles.body}>
          <FormController
            initialValues={{ email: 'jordan@example.com', password: '' }}
            validationSchema={loginSchema}
            onSubmit={values => doLogin(values)}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
              <>
                <Field label="Email Address" error={errors.email}>
                  <TextField
                    icon="mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="you@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Field>
                <Field label="Password" error={errors.password}>
                  <PasswordField
                    icon="lock"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="••••••••"
                  />
                </Field>

                <View style={styles.rowBetween}>
                  <Pressable onPress={() => setRemember(v => !v)} style={styles.remember} hitSlop={6}>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          borderColor: remember ? colors.copper : colors.borderDark,
                          backgroundColor: remember ? colors.copper : 'transparent',
                        },
                      ]}
                    >
                      {remember ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
                    </View>
                    <Typography size={14}>Remember me</Typography>
                  </Pressable>
                  <Typography
                    size={14}
                    font="bodySemiBold"
                    color="copper"
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                  >
                    Forgot Password?
                  </Typography>
                </View>

                <Btn
                  full
                  title={isPending ? 'Signing in…' : 'Log In'}
                  loading={isPending}
                  style={styles.cta}
                  onPress={handleSubmit}
                />
              </>
            )}
          </FormController>

          <Typography variant="tiny" textAlign="center" mT={12}>
            Demo family login: jordan@example.com · Copper1
          </Typography>

          <View style={styles.orRow}>
            <View style={[styles.orLine, { backgroundColor: `${colors.copper}66` }]} />
            <Typography size={11} color="mutedForeground" letterSpacing={1.5} textTransform="uppercase">
              or continue with
            </Typography>
            <View style={[styles.orLine, { backgroundColor: `${colors.copper}66` }]} />
          </View>

          <Btn full variant="outline" title="Continue with Google" onPress={() => doSocial('google')} />
          <Btn full variant="navy" title="Continue with Apple" style={styles.stacked} onPress={() => doSocial('apple')} />

          <View style={styles.signupRow}>
            <Typography size={14}>New to Copper Road? </Typography>
            <Typography
              size={14}
              font="bodySemiBold"
              color="copper"
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              Create Account
            </Typography>
          </View>

          <Pressable onPress={() => doGuest()} style={styles.guest} hitSlop={6}>
            <Typography size={14} font="bodyMedium" style={styles.underline}>
              Continue as Guest
            </Typography>
          </Pressable>
        </View>
      </Screen>
      <StatusScrim />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(24) },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  remember: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(8) },
  checkbox: {
    width: Sizer.hSize(18),
    height: Sizer.hSize(18),
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: { marginTop: Sizer.vSize(20) },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(12), marginVertical: Sizer.vSize(20) },
  orLine: { flex: 1, height: 1 },
  stacked: { marginTop: Sizer.vSize(10) },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Sizer.vSize(20) },
  guest: { alignSelf: 'center', minHeight: Sizer.vSize(44), justifyContent: 'center', marginTop: Sizer.vSize(4) },
  underline: { textDecorationLine: 'underline' },
});
