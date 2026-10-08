import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { CONTACT } from '../../../lib/copper-data';

const TERMS = [
  'Copper Road Maine Coon Cattery places kittens in indoor homes that will provide regular veterinary care. A non-refundable deposit reserves a kitten. Pet kittens are companions: spay or neuter is required between 6 and 8 months, declawing is not permitted, and limited registration paperwork follows proof of altering.',
  'Merchandise may be exchanged for size within 30 days. Kitten placements are not shipping orders — we arrange pickup, a reasonable delivery, or a meet-up.',
  'This app is a client preview. Agreements here illustrate the experience and do not replace the written contract.',
];

/** Ported from Project/src/components/cr/profile.tsx — Legal. */
export default function LegalScreen({ route }) {
  const colors = useColors();
  const doc = route.params?.doc === 'privacy' ? 'privacy' : 'terms';
  const title = doc === 'terms' ? 'Terms & Conditions' : 'Privacy Policy';

  const privacy = [
    'We use the details you share — name, contact, home, and preferences — to respond to applications, waitlists, and orders. This preview stores that information on your device only.',
    `We do not sell personal information. Questions can come to ${CONTACT.email} or ${CONTACT.phone}.`,
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title={title} />
      <Screen contentStyle={styles.body}>
        <View style={styles.stack}>
          {(doc === 'terms' ? TERMS : privacy).map(p => (
            <Typography key={p} size={14} lineHeight={21}>
              {p}
            </Typography>
          ))}
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20) },
  stack: { gap: Sizer.vSize(12) },
});
