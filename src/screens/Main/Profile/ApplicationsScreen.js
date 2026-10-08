import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Badge, Btn, Empty, Screen, statusTone } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { selectApplications } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/profile.tsx — Applications. */
export default function ApplicationsScreen({ navigation }) {
  const colors = useColors();
  const applications = useSelector(selectApplications);
  const s = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={s.root}>
      <BackBar title="My Applications" />
      <Screen contentStyle={styles.body}>
        {!applications.length ? (
          <Empty
            title="No applications yet"
            body="When you apply for a kitten it will appear here."
            action={<Btn full title="Submit An Application" onPress={() => navigation.navigate('ApplyScreen')} />}
          />
        ) : (
          <View style={styles.stack}>
            {applications.map(a => (
              <Pressable
                key={a.id}
                onPress={() => navigation.navigate('ApplicationDetailScreen', { id: a.id })}
                style={({ pressed }) => [s.card, { opacity: pressed ? 0.92 : 1 }]}
              >
                <View style={styles.headRow}>
                  <Typography size={15} font="bodySemiBold" flex={1}>
                    {a.id}
                  </Typography>
                  <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                </View>
                <Typography variant="bodySm" mT={4}>
                  {a.createdAt}
                </Typography>
                <Typography size={14}>Kitten: {a.data?.kitten || 'Any'}</Typography>
              </Pressable>
            ))}
          </View>
        )}
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    card: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(12) },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(8) },
});
