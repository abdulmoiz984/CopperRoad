import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { Btn, Pop } from '../../../components';
import { useColors } from '../../../hooks/useTheme';

/** Ported from Project/src/components/cr/learn.tsx — ApplyDone. */
export default function ApplyDoneScreen({ navigation, route }) {
  const colors = useColors();
  const ref = route.params?.ref;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Pop>
        <View style={[styles.mark, { backgroundColor: colors.tonegreenBg }]}>
          <Icon name="check" size={Sizer.fS(32)} color={colors.tonegreenFg} />
        </View>
      </Pop>
      <Typography size={36} font="displaySemiBold" textAlign="center" mT={16}>
        Thank you! We'll be in touch soon.
      </Typography>
      <Typography variant="bodySm" textAlign="center" mT={8}>
        Application reference
      </Typography>
      <Typography size={15} font="bodySemiBold" color="copper">
        {ref}
      </Typography>
      <Btn
        title="View My Applications"
        style={styles.cta}
        onPress={() => navigation.navigate('ApplicationsScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Sizer.hSize(32) },
  mark: {
    width: Sizer.hSize(80),
    height: Sizer.hSize(80),
    borderRadius: Sizer.hSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: { marginTop: Sizer.vSize(24) },
});
