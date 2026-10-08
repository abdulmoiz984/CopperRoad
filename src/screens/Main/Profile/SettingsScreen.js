import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Modal, Screen, SelectField } from '../../../components';
import { useColors, useTheme } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { deleteAccount as apiDelete } from '../../../api/profileService';
import { deleteAccount, selectLanguage, setLanguage } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';

/** Ported from Project/src/components/cr/profile.tsx — SettingsScreen. */
export default function SettingsScreen({ navigation }) {
  const colors = useColors();
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [del, setDel] = useState(false);

  const { mutate: syncDelete } = useCustomMutation({ mutationFn: apiDelete });

  const remove = () => {
    setDel(false);
    dispatch(deleteAccount());
    syncDelete();
    toast('Account removed from this device');
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LoginScreen' }] }));
  };

  return (
    <View style={s.root}>
      <BackBar title="Settings" />
      <Screen contentStyle={styles.body}>
        <View style={styles.stack}>
          <Pressable onPress={() => navigation.navigate('EditProfileScreen')} style={s.row}>
            <Typography size={15} flex={1}>
              Edit profile
            </Typography>
            <Icon name="chevron-right" size={Sizer.fS(18)} color={colors.dim} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('PasswordScreen')} style={s.row}>
            <Typography size={15} flex={1}>
              Change password
            </Typography>
            <Icon name="chevron-right" size={Sizer.fS(18)} color={colors.dim} />
          </Pressable>

          <Pressable onPress={toggleTheme} style={s.row}>
            <Typography size={15} flex={1}>
              Dark mode
            </Typography>
            <View
              style={[
                styles.checkbox,
                { borderColor: isDark ? colors.copper : colors.borderDark, backgroundColor: isDark ? colors.copper : 'transparent' },
              ]}
            >
              {isDark ? <Icon name="check" size={Sizer.fS(14)} color={colors.navy} /> : null}
            </View>
          </Pressable>

          <View style={s.panel}>
            <Typography size={15} mB={8}>
              Language
            </Typography>
            <SelectField
              value={language}
              options={['English', 'Español']}
              onChange={v => {
                dispatch(setLanguage(v));
                toast(`${v} selected`);
              }}
            />
          </View>

          <Btn full variant="outline" title="Delete account" onPress={() => setDel(true)} />
        </View>
      </Screen>

      <Modal
        open={del}
        danger
        title="Delete account?"
        body="This removes your profile from this device preview."
        confirm="Delete"
        onClose={() => setDel(false)}
        onConfirm={remove}
      />
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Sizer.hSize(12),
      minHeight: Sizer.vSize(56),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      paddingHorizontal: Sizer.hSize(16),
      ...softShadow(colors),
    },
    panel: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(8) },
  checkbox: {
    width: Sizer.hSize(22),
    height: Sizer.hSize(22),
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
