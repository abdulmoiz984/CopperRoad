import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Sizer from '../../../helpers/Sizer';
import { BackBar, Btn, Field, Screen, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { updateProfile } from '../../../api/profileService';
import { selectUser, updateUser } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';

/** The web renders the raw state keys as labels; these read properly. */
const LABELS = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phone: 'Phone',
  city: 'City',
  state: 'State',
  zip: 'Zip',
};

/** Ported from Project/src/components/cr/profile.tsx — EditProfile. */
export default function EditProfileScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
    zip: user?.zip || '',
  });

  const { mutate: sync } = useCustomMutation({ mutationFn: updateProfile });

  const save = () => {
    dispatch(updateUser(form));
    sync(form);
    toast('Profile saved');
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title="Edit Profile" />
      <Screen contentStyle={styles.body}>
        {Object.keys(form).map(k => (
          <Field key={k} label={LABELS[k] ?? k}>
            <TextField
              value={form[k]}
              onChangeText={v => setForm(f => ({ ...f, [k]: v }))}
              keyboardType={k === 'email' ? 'email-address' : k === 'phone' || k === 'zip' ? 'phone-pad' : 'default'}
              autoCapitalize={k === 'email' ? 'none' : 'sentences'}
            />
          </Field>
        ))}
        <Btn full title="Save" onPress={save} />
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16) },
});
