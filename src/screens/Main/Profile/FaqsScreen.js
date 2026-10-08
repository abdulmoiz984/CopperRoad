import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { faqs } from '../../../lib/copper-data';

/** Ported from Project/src/components/cr/profile.tsx — FaqsScreen. */
export default function FaqsScreen() {
  const colors = useColors();
  const [open, setOpen] = useState(faqs[0]?.q ?? null);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title="FAQ's" />
      <Screen contentStyle={styles.body}>
        {faqs.map(f => (
          <Pressable
            key={f.q}
            onPress={() => setOpen(open === f.q ? null : f.q)}
            style={[styles.row, { borderBottomColor: colors.border }]}
          >
            <Typography size={15} font="bodySemiBold">
              {f.q}
            </Typography>
            {open === f.q ? (
              <Typography variant="bodySm" lineHeight={21} mT={8}>
                {f.a}
              </Typography>
            ) : null}
          </Pressable>
        ))}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16) },
  row: { paddingVertical: Sizer.vSize(16), borderBottomWidth: 1 },
});
