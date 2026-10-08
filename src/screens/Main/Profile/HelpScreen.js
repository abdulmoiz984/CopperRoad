import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, SOCIAL_MARKS, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { CONTACT } from '../../../lib/copper-data';

/** Ported from Project/src/components/cr/profile.tsx — HelpScreen. */
export default function HelpScreen({ navigation }) {
  const colors = useColors();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title="Help & Support" />
      <Screen contentStyle={styles.body}>
        <Typography size={14}>{CONTACT.address}</Typography>
        <Typography
          size={14}
          font="bodySemiBold"
          color="copper"
          mT={12}
          onPress={() => Linking.openURL(CONTACT.emailHref).catch(() => {})}
        >
          {CONTACT.email}
        </Typography>
        <Typography
          size={14}
          font="bodySemiBold"
          color="copper"
          onPress={() => Linking.openURL(CONTACT.phoneHref).catch(() => {})}
        >
          {CONTACT.phone}
        </Typography>

        <View style={styles.socialRow}>
          {SOCIAL_MARKS.map(({ label, Mark }) => (
            <Pressable
              key={label}
              onPress={() => Linking.openURL(CONTACT.emailHref).catch(() => {})}
              style={[styles.social, { backgroundColor: colors.navy }]}
            >
              <Mark size={16} color="#FFFFFF" />
            </Pressable>
          ))}
        </View>

        <Link label="Terms & Conditions" onPress={() => navigation.navigate('LegalScreen', { doc: 'terms' })} />
        <Link label="Privacy Policy" onPress={() => navigation.navigate('LegalScreen', { doc: 'privacy' })} />
        <Link label="Contact Us" onPress={() => navigation.navigate('ContactScreen')} />

        <Typography variant="tiny" mT={12}>
          App version 1.0.0 · Copper Road preview
        </Typography>
      </Screen>
    </View>
  );
}

function Link({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.link}>
      <Typography size={15} font="bodySemiBold">
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20) },
  socialRow: { flexDirection: 'row', gap: Sizer.hSize(8), marginVertical: Sizer.vSize(16) },
  social: {
    width: Sizer.hSize(44),
    height: Sizer.hSize(44),
    borderRadius: Sizer.hSize(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: { minHeight: Sizer.vSize(44), justifyContent: 'center' },
});
