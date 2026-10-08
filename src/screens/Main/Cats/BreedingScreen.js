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
import { cats, faqs, litters, pillars } from '../../../lib/copper-data';
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
          Our breeding program is built around thoughtful planning, responsible care, and a commitment to the health and
          well-being of our Maine Coons. We carefully consider pedigrees, lineage, temperament, and health when planning
          our breeding program.
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
          FAQ
        </Typography>
        <View style={styles.faqs}>
          {faqs.slice(0, 4).map(f => (
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
  faq: { paddingVertical: Sizer.vSize(12), borderBottomWidth: 1 },
  footerCta: { marginTop: Sizer.vSize(24) },
});
