import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Field, Screen, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { selectApplications } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';
import { Missing } from '../Cats/CatProfileScreen';

/** Ported from Project/src/components/cr/profile.tsx — ApplicationDetail. */
export default function ApplicationDetailScreen({ navigation, route }) {
  const colors = useColors();
  const applications = useSelector(selectApplications);
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [note, setNote] = useState('');
  const [sentNote, setSentNote] = useState('');

  const app = applications.find(a => a.id === route.params?.id);
  if (!app) return <Missing navigation={navigation} />;

  return (
    <View style={s.root}>
      <BackBar title={app.id} subtitle={app.status} />
      <Screen contentStyle={styles.body}>
        <View style={[styles.timeline, { borderLeftColor: colors.copper }]}>
          {app.timeline.map(t => (
            <View key={t.label}>
              <Typography
                size={15}
                font={t.done ? 'bodySemiBold' : 'bodyRegular'}
                color={t.done ? 'foreground' : 'mutedForeground'}
              >
                {t.label}
              </Typography>
              <Typography variant="tiny">{t.detail}</Typography>
            </View>
          ))}
        </View>

        <View style={[s.card, styles.spaced]}>
          <Typography size={15} font="bodySemiBold">
            Messages
          </Typography>
          <Typography variant="bodySm" lineHeight={21} mT={8}>
            Copper Road: Thank you for applying. We'll write as soon as we've read through your home.
          </Typography>
          {sentNote ? (
            <Typography size={14} mT={8}>
              You: {sentNote}
            </Typography>
          ) : null}
        </View>

        <Field label="Send a note" style={styles.spaced}>
          <TextField multiline value={note} onChangeText={setNote} />
        </Field>
        <Btn
          title="Send"
          onPress={() => {
            if (!note) return;
            setSentNote(note);
            setNote('');
            toast('Note sent to the cattery');
          }}
        />
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
  body: { paddingHorizontal: Sizer.hSize(20) },
  timeline: { gap: Sizer.vSize(12), borderLeftWidth: 2, paddingLeft: Sizer.hSize(16) },
  spaced: { marginTop: Sizer.vSize(16) },
});
