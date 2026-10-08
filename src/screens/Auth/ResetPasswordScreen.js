import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Sizer from '../../helpers/Sizer';
import { FormController, Typography } from '../../atomComponents';
import { Btn, Field, Screen, TextField } from '../../components';
import { useColors } from '../../hooks/useTheme';
import { useCustomMutation } from '../../query';
import { resetPassword } from '../../api/authService';
import { resetSchema } from '../../validations';
import { softShadow } from '../../globalStyle/Theme';
import { RADIUS } from '../../globalStyle/Theme';
import { toast } from '../../utils';
import AuthHeader, { StatusScrim } from './AuthHeader';

/** Ported from Project/src/components/cr/auth.tsx — ResetPassword. */
export default function ResetPasswordScreen({ navigation }) {
  const colors = useColors();
  // A boolean rather than the address itself: with validation gated off under
  // USE_MOCK_API an empty email is submittable, and `'' ? …` would have kept
  // the form on screen as though nothing happened.
  const [sent, setSent] = useState(null);

  const { mutate, isPending } = useCustomMutation({
    mutationFn: resetPassword,
    onSuccess: (_res, variables) => {
      setSent({ email: variables.email });
      toast('Reset link sent');
    },
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      <Screen padded={false}>
        <AuthHeader title="Reset Password" sub="We'll email you a link to choose a new password." />

        <View style={styles.body}>
          {sent ? (
            <View style={[styles.sent, { backgroundColor: colors.card }, softShadow(colors)]}>
              <Typography variant="displayLg" color="successText" textAlign="center">
                Check your inbox
              </Typography>
              <Typography variant="bodySm" textAlign="center" lineHeight={21} mT={8}>
                A reset link is on its way to {sent.email || 'your inbox'}. This is a preview — no email is actually sent.
              </Typography>
              <Btn
                full
                title="Back to Log In"
                style={styles.cta}
                onPress={() => navigation.canGoBack() && navigation.goBack()}
              />
            </View>
          ) : (
            <FormController
              initialValues={{ email: '' }}
              validationSchema={resetSchema}
              onSubmit={values => mutate(values)}
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
                  <Btn full title="Send Reset Link" loading={isPending} style={styles.cta} onPress={handleSubmit} />
                </>
              )}
            </FormController>
          )}
        </View>
      </Screen>
      <StatusScrim />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(24) },
  sent: { borderRadius: RADIUS.xxxl, padding: Sizer.hSize(20), alignItems: 'center' },
  cta: { marginTop: Sizer.vSize(20) },
});
