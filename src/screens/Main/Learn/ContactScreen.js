import React, { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Field, Screen, SelectField, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { sendContact } from '../../../api/contentService';
import { CONTACT, gettingToKnowYou, visitInfo } from '../../../lib/copper-data';
import { toast } from '../../../utils';

const SUBJECTS = ['Kitten Inquiry', 'Waiting List', 'Retired Adult', 'Schedule A Visit', 'Merchandise', 'Other'];

/** Ported from Project/src/components/cr/learn.tsx — ContactScreen. */
export default function ContactScreen() {
  const colors = useColors();
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Kitten Inquiry', message: '' });
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const { mutate, isPending } = useCustomMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      setSent(true);
      toast('Message sent');
    },
  });

  const send = () => {
    if (!form.name || !form.email.includes('@') || form.message.length < 4) {
      setErr('Name, email, and a message are required.');
      return;
    }
    setErr('');
    mutate(form);
  };

  return (
    <View style={s.root}>
      <BackBar title="Contact Us" />
      <Screen contentStyle={styles.body}>
        {sent ? (
          <View style={s.card}>
            <Typography variant="displayLg" color="successText" textAlign="center">
              Message sent
            </Typography>
            <Typography variant="bodySm" textAlign="center" lineHeight={21} mT={8}>
              We'll reply to {form.email}. This preview stays on your device.
            </Typography>
          </View>
        ) : (
          <>
            <View style={[s.card, styles.intro]}>
              <Typography size={15} lineHeight={23}>
                {gettingToKnowYou.intro}
              </Typography>
              <View style={styles.channelRow}>
                {gettingToKnowYou.channels.map(channel => (
                  <View key={channel} style={[styles.channel, { backgroundColor: colors.tonecopperBg }]}>
                    <Typography size={12} font="bodySemiBold" color={colors.tonecopperFg}>
                      {channel}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>

            <Field label="Name">
              <TextField value={form.name} onChangeText={v => set('name', v)} />
            </Field>
            <Field label="Email">
              <TextField value={form.email} onChangeText={v => set('email', v)} keyboardType="email-address" autoCapitalize="none" />
            </Field>
            <Field label="Phone">
              <TextField value={form.phone} onChangeText={v => set('phone', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Subject">
              <SelectField value={form.subject} options={SUBJECTS} onChange={v => set('subject', v)} />
            </Field>
            <Field label="Message" error={err}>
              <TextField multiline value={form.message} onChangeText={v => set('message', v)} />
            </Field>
            <Btn full title="Send" loading={isPending} onPress={send} />
          </>
        )}

        <View style={[s.card, styles.spaced]}>
          <Typography size={15} font="bodySemiBold" mB={4}>
            Visit Copper Road
          </Typography>
          <Typography variant="bodySm" lineHeight={21} mB={8}>
            {visitInfo.location} {visitInfo.appointment}
          </Typography>
          <Typography size={14}>{CONTACT.address}</Typography>
          <Typography
            size={14}
            font="bodySemiBold"
            color="copper"
            mT={4}
            onPress={() => Linking.openURL(CONTACT.phoneHref).catch(() => {})}
          >
            {CONTACT.phone}
          </Typography>
          <Typography
            size={14}
            font="bodySemiBold"
            color="copper"
            onPress={() => Linking.openURL(CONTACT.emailHref).catch(() => {})}
          >
            {CONTACT.email}
          </Typography>
        </View>

        {/* The web embeds a Google Maps iframe; a phone opens the Maps app. */}
        <Pressable
          onPress={() => Linking.openURL(CONTACT.maps).catch(() => {})}
          style={[s.card, styles.spaced, styles.mapRow]}
        >
          <Icon name="map-pin" size={Sizer.fS(20)} color={colors.copper} />
          <View style={styles.flex}>
            <Typography size={15} font="bodySemiBold">
              Open in Maps
            </Typography>
            <Typography variant="tiny">{CONTACT.city}</Typography>
          </View>
          <Icon name="chevron-right" size={Sizer.fS(18)} color={colors.dim} />
        </Pressable>
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
  intro: { marginBottom: Sizer.vSize(16) },
  channelRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(6), marginTop: Sizer.vSize(10) },
  channel: { borderRadius: RADIUS.pill, paddingHorizontal: Sizer.hSize(10), paddingVertical: Sizer.vSize(4) },
  flex: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16) },
  spaced: { marginTop: Sizer.vSize(12) },
  mapRow: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(12) },
});
