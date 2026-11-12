import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Badge, Btn, Eyebrow, Photo, Screen, statusTone } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { joinWaitlist as apiJoinWaitlist } from '../../../api/catteryService';
import { cats, faqs, goingHome, litters, pillars, waitingList } from '../../../lib/copper-data';
import { joinWaitlist, selectWaitlist } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';

/** Ported from Project/src/components/cr/cats.tsx — Breeding. */
export default function BreedingScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const waitlist = useSelector(selectWaitlist);
  const s = useMemo(() => makeStyles(colors), [colors]);
  const [open, setOpen] = useState(faqs[1]?.q ?? null);

  const { mutate: syncWaitlist } = useCustomMutation({ mutationFn: apiJoinWaitlist });

  const join = id => {
    dispatch(joinWaitlist(id));
    syncWaitlist(id);
    toast("You're on the waitlist");
  };

  return (
    <View style={s.root}>
      <BackBar title="Breeding Plan" />
      <Screen contentStyle={styles.body}>
        <Eyebrow>RESPONSIBLE BREEDING</Eyebrow>
        <Typography size={36} font="displaySemiBold" mT={2}>
          Beauty Begins With Health.
        </Typography>
        <Typography variant="bodySm" lineHeight={21} mT={8}>
          We are a small cattery dedicated to raising healthy, well-socialized Maine Coons with exceptional
          temperaments, beautiful features, and strong pedigrees. All of our cats are registered with TICA and CFF and
          come from carefully selected bloodlines with documented 5-generation pedigrees, and all of our breeding cats
          undergo health screening and DNA testing.
        </Typography>

        <View style={styles.stack}>
          {pillars.map(p => (
            <View key={p.id} style={s.card}>
              <Typography variant="displayMd">{p.title}</Typography>
              <Typography variant="bodySm" mT={4}>
                {p.text}
              </Typography>
            </View>
          ))}
        </View>

        <Typography variant="displayLg" mT={32}>
          Planned Litters
        </Typography>
        <View style={[styles.timeline, { borderLeftColor: `${colors.copper}80` }]}>
          {litters.map(l => {
            const queen = cats.find(c => c.id === l.queen);
            const king = cats.find(c => c.id === l.king);
            const on = waitlist.includes(l.id);
            return (
              <View key={l.id} style={s.card}>
                <Badge tone={statusTone(l.status)}>{l.status}</Badge>
                <View style={styles.pairRow}>
                  {[queen, king].filter(Boolean).map(c => (
                    <Pressable
                      key={c.id}
                      onPress={() => navigation.navigate('CatProfileScreen', { id: c.id })}
                      style={styles.flex}
                    >
                      <Photo source={c.photo} style={styles.pairPhoto} radius={RADIUS.md} />
                      <Typography size={14} font="bodySemiBold" mT={4}>
                        {c.short}
                      </Typography>
                    </Pressable>
                  ))}
                </View>
                <Typography size={14} mT={8}>
                  Expected coats: {l.colors}
                </Typography>
                <Typography variant="bodySm">Birth window: {l.birth}</Typography>
                <Typography variant="bodySm">Go-home window: {l.goHome}</Typography>
                {l.note ? (
                  <Typography variant="bodySm" lineHeight={20} mT={4}>
                    {l.note}
                  </Typography>
                ) : null}
                <Btn
                  full
                  variant="outline"
                  title={on ? 'On The Waitlist' : 'Join Waitlist'}
                  style={styles.cta}
                  onPress={() => join(l.id)}
                />
              </View>
            );
          })}
        </View>

        <Typography variant="displayLg" mT={32}>
          Joining Our Waiting List
        </Typography>
        <View style={[s.card, styles.infoCard]}>
          <View style={styles.statRow}>
            <View style={styles.flex}>
              <Typography size={28} font="displaySemiBold" color="copper">
                {waitingList.deposit}
              </Typography>
              <Typography variant="tiny">Deposit to reserve a place</Typography>
            </View>
            <View style={styles.flex}>
              <Typography size={28} font="displaySemiBold" color="copper">
                {waitingList.typicalPrice}
              </Typography>
              <Typography variant="tiny">Typical kitten price</Typography>
            </View>
          </View>
          <View style={styles.bullets}>
            {waitingList.points.map(point => (
              <Typography key={point} variant="bodySm" lineHeight={21}>
                {'\u2022  '}
                {point}
              </Typography>
            ))}
          </View>
        </View>

        <Typography variant="displayLg" mT={32}>
          Going Home
        </Typography>
        <View style={[s.card, styles.infoCard]}>
          <Typography size={15} font="bodySemiBold">
            {goingHome.age}
          </Typography>
          <Typography variant="bodySm" mT={8}>
            Before leaving Copper Road, each kitten will have:
          </Typography>
          <View style={styles.bullets}>
            {goingHome.includes.map(item => (
              <Typography key={item} variant="bodySm" lineHeight={21}>
                {'\u2022  '}
                {item}
              </Typography>
            ))}
          </View>
          <Typography variant="bodySm" lineHeight={21} mT={8}>
            {goingHome.alterNote}
          </Typography>
        </View>

        <Typography variant="displayLg" mT={32}>
          FAQ
        </Typography>
        <View style={styles.faqs}>
          {faqs.map(f => (
            <Pressable
              key={f.q}
              onPress={() => setOpen(open === f.q ? null : f.q)}
              style={[styles.faq, { borderBottomColor: colors.border }]}
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
        </View>

        <Btn full title="Submit An Application" style={styles.footerCta} onPress={() => navigation.navigate('ApplyScreen')} />
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
  flex: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20) },
  stack: { gap: Sizer.vSize(12), marginTop: Sizer.vSize(16) },
  timeline: { gap: Sizer.vSize(16), marginTop: Sizer.vSize(12), borderLeftWidth: 2, paddingLeft: Sizer.hSize(16) },
  pairRow: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(12) },
  pairPhoto: { width: '100%', height: Sizer.vSize(96) },
  cta: { marginTop: Sizer.vSize(12) },
  faqs: { marginTop: Sizer.vSize(8) },
  bullets: { gap: Sizer.vSize(6), marginTop: Sizer.vSize(8) },
  infoCard: { marginTop: Sizer.vSize(12) },
  statRow: { flexDirection: 'row', gap: Sizer.hSize(8) },
  faq: { paddingVertical: Sizer.vSize(12), borderBottomWidth: 1 },
  footerCta: { marginTop: Sizer.vSize(24) },
});
