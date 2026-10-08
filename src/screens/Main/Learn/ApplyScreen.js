import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Chip, Eyebrow, Field, Screen, SelectField, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { createApplication, saveApplicationDraft } from '../../../api/applicationService';
import { US_STATES, hearAbout, kittens } from '../../../lib/copper-data';
import { saveDraft, selectDraft, submitApplication } from '../../../redux/slices/appSlice';
import { applicationId, toast } from '../../../utils';

const COATS = ['Black smoke', 'Silver shaded', 'Blue smoke tabby', 'Red tabby', 'Calico', 'No preference'];

/** Ported from Project/src/components/cr/learn.tsx — ApplyForm. */
export default function ApplyScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const draft = useSelector(selectDraft);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [step, setStep] = useState(0);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({
    firstName: draft?.firstName || '',
    lastName: draft?.lastName || '',
    email: draft?.email || '',
    phone: draft?.phone || '',
    contact: draft?.contact || 'Email',
    address: draft?.address || '',
    city: draft?.city || '',
    state: draft?.state || 'SD',
    zip: draft?.zip || '',
    home: 'House',
    own: 'Own',
    landlord: '',
    adults: '2',
    children: 'No',
    ages: '',
    pets: '',
    fence: 'No',
    indoor: 'Yes',
    kitten: 'Any',
    sex: 'No preference',
    coats: '',
    purpose: 'Pet home',
    timeline: 'Just researching',
    experience: '',
    why: '',
    vet: '',
    comments: '',
    hear: '',
    deposit: '',
    homeAgree: '',
    terms: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const { mutate: syncSubmit } = useCustomMutation({ mutationFn: createApplication });
  const { mutate: syncDraft } = useCustomMutation({ mutationFn: saveApplicationDraft });

  const coats = form.coats ? form.coats.split('|') : [];
  const toggleCoat = c => {
    const next = coats.includes(c) ? coats.filter(x => x !== c) : [...coats, c];
    set('coats', next.join('|'));
  };

  const validate = () => {
    if (step === 0 && (!form.firstName || !form.lastName || !form.email.includes('@') || !form.phone || !form.city || !form.zip))
      return 'Please complete your contact details.';
    if (step === 1 && form.own === 'Rent' && !form.landlord) return 'Let us know about landlord approval.';
    if (step === 2 && (!form.experience || !form.why))
      return 'Tell us a little about your experience and why a Maine Coon.';
    if (step === 3 && (form.deposit !== 'yes' || form.homeAgree !== 'yes' || form.terms !== 'yes' || !form.hear))
      return 'Please complete the agreements and how you heard about us.';
    return '';
  };

  const next = () => {
    const problem = validate();
    if (problem) {
      setErr(problem);
      return;
    }
    setErr('');
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const ref = applicationId();
    dispatch(submitApplication({ id: ref, data: form }));
    syncSubmit(form);
    navigation.navigate('ApplyDoneScreen', { ref });
  };

  return (
    <View style={s.root}>
      <BackBar title="Submit An Application" subtitle={`Step ${step + 1} of 4`} />
      <Screen contentStyle={styles.body}>
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, { width: `${((step + 1) / 4) * 100}%`, backgroundColor: colors.copper }]} />
        </View>

        {step === 0 ? (
          <View style={styles.stack}>
            <Eyebrow>ABOUT YOU</Eyebrow>
            <View style={styles.pair}>
              <View style={styles.flex}>
                <Field label="First Name">
                  <TextField value={form.firstName} onChangeText={v => set('firstName', v)} />
                </Field>
              </View>
              <View style={styles.flex}>
                <Field label="Last Name">
                  <TextField value={form.lastName} onChangeText={v => set('lastName', v)} />
                </Field>
              </View>
            </View>
            <Field label="Email">
              <TextField value={form.email} onChangeText={v => set('email', v)} keyboardType="email-address" autoCapitalize="none" />
            </Field>
            <Field label="Phone">
              <TextField value={form.phone} onChangeText={v => set('phone', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Preferred contact">
              <View style={styles.chipRow}>
                {['Email', 'Phone', 'Text'].map(c => (
                  <Chip key={c} active={form.contact === c} onPress={() => set('contact', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Address">
              <TextField value={form.address} onChangeText={v => set('address', v)} />
            </Field>
            <Field label="City">
              <TextField value={form.city} onChangeText={v => set('city', v)} />
            </Field>
            <View style={styles.pair}>
              <View style={styles.flex}>
                <Field label="State">
                  <SelectField value={form.state} options={US_STATES} onChange={v => set('state', v)} />
                </Field>
              </View>
              <View style={styles.flex}>
                <Field label="Zip Code">
                  <TextField value={form.zip} onChangeText={v => set('zip', v)} keyboardType="number-pad" />
                </Field>
              </View>
            </View>
          </View>
        ) : null}

        {step === 1 ? (
          <View style={styles.stack}>
            <Eyebrow>YOUR HOME</Eyebrow>
            <Field label="Home type">
              <View style={styles.chipRow}>
                {['House', 'Apartment', 'Other'].map(c => (
                  <Chip key={c} active={form.home === c} onPress={() => set('home', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Own or rent">
              <View style={styles.chipRow}>
                {['Own', 'Rent'].map(c => (
                  <Chip key={c} active={form.own === c} onPress={() => set('own', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            {form.own === 'Rent' ? (
              <Field label="Landlord approval">
                <TextField value={form.landlord} onChangeText={v => set('landlord', v)} placeholder="Yes, written approval" />
              </Field>
            ) : null}
            <Field label="Number of adults">
              <TextField value={form.adults} onChangeText={v => set('adults', v)} keyboardType="number-pad" />
            </Field>
            <Field label="Children in home">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.children === c} onPress={() => set('children', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            {form.children === 'Yes' ? (
              <Field label="Ages">
                <TextField value={form.ages} onChangeText={v => set('ages', v)} />
              </Field>
            ) : null}
            <Field label="Other pets">
              <TextField value={form.pets} onChangeText={v => set('pets', v)} placeholder="Type and number" />
            </Field>
            <Field label="Fenced yard">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.fence === c} onPress={() => set('fence', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Will the kitten be indoor-only?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.indoor === c} onPress={() => set('indoor', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.stack}>
            <Eyebrow>YOUR KITTEN PREFERENCES</Eyebrow>
            <Field label="Interested kitten">
              <SelectField
                value={form.kitten}
                options={['Any', ...kittens.map(k => k.name)]}
                onChange={v => set('kitten', v)}
              />
            </Field>
            <Field label="Preferred sex">
              <View style={styles.chipWrap}>
                {['Male', 'Female', 'No preference'].map(c => (
                  <Chip key={c} active={form.sex === c} onPress={() => set('sex', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Preferred coat color">
              <View style={styles.chipWrap}>
                {COATS.map(c => (
                  <Chip key={c} active={coats.includes(c)} onPress={() => toggleCoat(c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Interest">
              <View style={styles.chipRow}>
                {['Pet home', 'Breeding interest'].map(c => (
                  <Chip key={c} active={form.purpose === c} onPress={() => set('purpose', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Timeline">
              <SelectField
                value={form.timeline}
                options={['Immediately', '1–3 months', '3–6 months', 'Just researching']}
                onChange={v => set('timeline', v)}
              />
            </Field>
            <Field label="Previous cat experience">
              <TextField multiline value={form.experience} onChangeText={v => set('experience', v)} />
            </Field>
            <Field label="Why Maine Coon?">
              <TextField multiline value={form.why} onChangeText={v => set('why', v)} />
            </Field>
            <Field label="Veterinarian name and clinic (optional)">
              <TextField value={form.vet} onChangeText={v => set('vet', v)} />
            </Field>
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.stack}>
            <Eyebrow>REVIEW &amp; SUBMIT</Eyebrow>
            <View style={s.summary}>
              <Typography size={15} font="bodySemiBold">
                {form.firstName} {form.lastName}
              </Typography>
              <Typography size={14}>
                {form.email} · {form.phone}
              </Typography>
              <Typography size={14}>
                {form.city}, {form.state} {form.zip}
              </Typography>
              <Typography size={14} mT={8}>
                Kitten: {form.kitten} · {form.sex} · {form.timeline}
              </Typography>
            </View>
            <Field label="Additional questions">
              <TextField multiline value={form.comments} onChangeText={v => set('comments', v)} />
            </Field>
            <Field label="How did you hear about us?">
              <SelectField value={form.hear} options={hearAbout} placeholder="Choose one" onChange={v => set('hear', v)} />
            </Field>
            <Agree on={form.deposit === 'yes'} onPress={() => set('deposit', form.deposit === 'yes' ? '' : 'yes')} label="I understand a deposit is required to reserve a kitten" />
            <Agree on={form.homeAgree === 'yes'} onPress={() => set('homeAgree', form.homeAgree === 'yes' ? '' : 'yes')} label="I agree to provide a loving indoor home and regular vet care" />
            <Agree on={form.terms === 'yes'} onPress={() => set('terms', form.terms === 'yes' ? '' : 'yes')} label="I agree to the Terms & Conditions and Privacy Policy" />
          </View>
        ) : null}

        {err ? (
          <Typography size={14} color={colors.dangerText} mT={12}>
            {err}
          </Typography>
        ) : null}

        <View style={styles.actions}>
          <Btn
            variant="outline"
            title="Back"
            onPress={() => (step === 0 ? navigation.canGoBack() && navigation.goBack() : setStep(step - 1))}
          />
          <Btn
            variant="ghost"
            title="Save draft"
            onPress={() => {
              dispatch(saveDraft(form));
              syncDraft(form);
              toast('Draft saved');
            }}
          />
          <View style={styles.flex}>
            <Btn full title={step === 3 ? 'Submit Application' : 'Next'} onPress={next} />
          </View>
        </View>
      </Screen>
    </View>
  );
}

/** Hoisted: defining it inside the screen remounts it on every keystroke. */
function Agree({ on, label, onPress }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={styles.agree}>
      <View
        style={[
          styles.checkbox,
          { borderColor: on ? colors.copper : colors.borderDark, backgroundColor: on ? colors.copper : 'transparent' },
        ]}
      >
        {on ? <Icon name="check" size={Sizer.fS(12)} color={colors.navy} /> : null}
      </View>
      <Typography size={14} flex={1} lineHeight={20}>
        {label}
      </Typography>
    </Pressable>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    summary: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16) },
  progressTrack: { height: Sizer.vSize(6), borderRadius: RADIUS.pill, overflow: 'hidden', marginBottom: Sizer.vSize(16) },
  progressFill: { height: '100%', borderRadius: RADIUS.pill },
  stack: { gap: Sizer.vSize(4) },
  pair: { flexDirection: 'row', gap: Sizer.hSize(8) },
  chipRow: { flexDirection: 'row', gap: Sizer.hSize(8) },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8) },
  agree: { flexDirection: 'row', alignItems: 'flex-start', gap: Sizer.hSize(10), marginBottom: Sizer.vSize(8) },
  checkbox: {
    width: Sizer.hSize(18),
    height: Sizer.hSize(18),
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizer.vSize(2),
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Sizer.hSize(8), marginTop: Sizer.vSize(16) },
});
