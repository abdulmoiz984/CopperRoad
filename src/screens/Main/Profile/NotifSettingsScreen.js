import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { updateNotificationPreferences } from '../../../api/profileService';
import { selectNotif, toggleNotif } from '../../../redux/slices/appSlice';

const ROWS = [
  ['litters', 'New litters'],
  ['kittens', 'Kitten availability'],
  ['orders', 'Order updates'],
];

/** Ported from Project/src/components/cr/profile.tsx — NotifSettings. */
export default function NotifSettingsScreen() {
  const colors = useColors();
  const dispatch = useDispatch();
  const notif = useSelector(selectNotif);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const { mutate: sync } = useCustomMutation({ mutationFn: updateNotificationPreferences });

  return (
    <View style={s.root}>
      <BackBar title="Notifications" />
      <Screen contentStyle={styles.body}>
        <View style={styles.stack}>
          {ROWS.map(([key, label]) => {
            const on = !!notif[key];
            return (
              <Pressable
                key={key}
                onPress={() => {
                  dispatch(toggleNotif(key));
                  sync({ ...notif, [key]: !on });
                }}
                style={s.row}
              >
                <Typography size={15} flex={1}>
                  {label}
                </Typography>
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: on ? colors.copper : colors.borderDark, backgroundColor: on ? colors.copper : 'transparent' },
                  ]}
                >
                  {on ? <Icon name="check" size={Sizer.fS(14)} color={colors.navy} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </Screen>
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
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      paddingHorizontal: Sizer.hSize(16),
      paddingVertical: Sizer.vSize(16),
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
