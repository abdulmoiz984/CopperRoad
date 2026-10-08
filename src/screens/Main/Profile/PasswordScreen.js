import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import { BackBar, Btn, Field, PasswordField, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { changePassword } from '../../../api/profileService';
import { toast } from '../../../utils';

/** Ported from Project/src/components/cr/profile.tsx — PasswordScreen. */
export default function PasswordScreen({ navigation }) {
  const colors = useColors();
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');

  const { mutate, isPending } = useCustomMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast('Password updated');
      if (navigation.canGoBack()) navigation.goBack();
    },
  });

  const update = () => {
    if (next.length < 6 || next !== confirm) {
      setErr('Use 6+ characters and match both fields.');
      return;
    }
    setErr('');
    mutate({ password: next });
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title="Change Password" />
      <Screen contentStyle={styles.body}>
        <Field label="New password" error={err}>
          <PasswordField value={next} onChangeText={setNext} />
        </Field>
        <Field label="Confirm">
          <PasswordField value={confirm} onChangeText={setConfirm} />
        </Field>
        <Btn full title="Update password" loading={isPending} onPress={update} />
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16) },
});
