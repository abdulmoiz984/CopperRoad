import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { checklist, feedingRows } from '../../../lib/copper-data';
import { shareText } from '../../../utils';

/** Ported from Project/src/components/cr/learn.tsx — GuideScreen. */
export default function GuideScreen({ route }) {
  const colors = useColors();
  const s = useMemo(() => makeStyles(colors), [colors]);
  const id = route.params?.id === 'feeding' ? 'feeding' : 'checklist';
  const [checks, setChecks] = useState([]);

  const toggle = item =>
    setChecks(c => (c.includes(item) ? c.filter(x => x !== item) : [...c, item]));

  return (
    <View style={s.root}>
      <BackBar title={id === 'checklist' ? 'New Kitten Checklist' : 'Feeding Guide'} />
      <Screen contentStyle={styles.body}>
        <Typography variant="tiny" mB={12}>
          Sample content — review and approve before launch. Use Share to keep a copy.
        </Typography>

        {id === 'checklist' ? (
          <View style={styles.stack}>
            {checklist.map(item => {
              const on = checks.includes(item);
              return (
                <Pressable key={item} onPress={() => toggle(item)} style={s.check}>
                  <View
                    style={[
                      styles.checkbox,
                      { borderColor: on ? colors.copper : colors.borderDark, backgroundColor: on ? colors.copper : 'transparent' },
                    ]}
                  >
                    {on ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
                  </View>
                  <Typography size={14} flex={1} lineHeight={20}>
                    {item}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={s.table}>
            <View style={[styles.tr, { backgroundColor: colors.navy }]}>
              <Typography size={14} font="bodySemiBold" color="#FFFFFF" style={styles.colAge}>
                Age
              </Typography>
              <Typography size={14} font="bodySemiBold" color="#FFFFFF" style={styles.colMeals}>
                Meals
              </Typography>
              <Typography size={14} font="bodySemiBold" color="#FFFFFF" style={styles.colNotes}>
                Notes
              </Typography>
            </View>
            {feedingRows.map((r, i) => (
              <View
                key={r.age}
                style={[styles.tr, i > 0 && { borderTopWidth: 1, borderTopColor: colors.secondary }]}
              >
                <Typography size={13} style={styles.colAge}>
                  {r.age}
                </Typography>
                <Typography size={13} style={styles.colMeals}>
                  {r.meals}
                </Typography>
                <Typography size={13} style={styles.colNotes}>
                  {r.notes}
                </Typography>
              </View>
            ))}
          </View>
        )}

        <Btn
          full
          title="Share"
          style={styles.cta}
          onPress={() => shareText(id === 'checklist' ? 'Copper Road — New Kitten Checklist' : 'Copper Road — Feeding Guide')}
        />
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    check: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Sizer.hSize(12),
      borderRadius: RADIUS.md,
      backgroundColor: colors.card,
      padding: Sizer.hSize(12),
      ...softShadow(colors),
    },
    table: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(20) },
  stack: { gap: Sizer.vSize(8) },
  checkbox: {
    width: Sizer.hSize(18),
    height: Sizer.hSize(18),
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizer.vSize(2),
  },
  tr: { flexDirection: 'row', paddingHorizontal: Sizer.hSize(12), paddingVertical: Sizer.vSize(12), gap: Sizer.hSize(8) },
  colAge: { width: '26%' },
  colMeals: { width: '20%' },
  colNotes: { flex: 1 },
  cta: { marginTop: Sizer.vSize(16) },
});
