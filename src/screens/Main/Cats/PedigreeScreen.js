import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Divider, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { cats, pedigreeFor } from '../../../lib/copper-data';
import { Missing } from './CatProfileScreen';

/** Ported from Project/src/components/cr/cats.tsx — Pedigree. */
export default function PedigreeScreen({ navigation, route }) {
  const colors = useColors();
  const s = useMemo(() => makeStyles(colors), [colors]);
  const cat = cats.find(c => c.id === route.params?.id);
  const tree = useMemo(() => (cat ? pedigreeFor(cat) : null), [cat]);

  if (!cat || !tree) return <Missing navigation={navigation} />;

  return (
    <View style={s.root}>
      <BackBar title="Pedigree" subtitle={cat.name} />
      <Screen>
        <Typography variant="bodySm" lineHeight={21}>
          A simple five-generation view for the mockup. Official pedigrees are provided with each kitten.
        </Typography>

        <View style={styles.gens}>
          {tree.gens.map((gen, gi) => (
            <View key={gi}>
              <Typography size={11} font="bodySemiBold" color="copper" letterSpacing={1.76} textTransform="uppercase">
                Generation {gi + 1}
              </Typography>
              <View style={styles.grid}>
                {gen.map((n, i) => (
                  <View key={i} style={[s.node, gi === 0 && styles.nodeWide]}>
                    <Typography variant="displaySm">{n.name}</Typography>
                    <Typography variant="tiny" mT={2}>
                      {n.note}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <Divider />
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    node: {
      width: '48%',
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      padding: Sizer.hSize(12),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  gens: { gap: Sizer.vSize(16), paddingVertical: Sizer.vSize(16) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8), marginTop: Sizer.vSize(8) },
  nodeWide: { width: '100%' },
});
