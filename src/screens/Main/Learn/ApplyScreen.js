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

/**
 * The cattery's own "Copper Road Forever Home Application", section for
 * section. Step titles match the headings on the client's document.
 */
const STEPS = [
  'Your Details',
  'Household Information',
  'Your Home',
  'Current Pets',
  'About Your Future Kitten',
  'Care, Commitment & Lifestyle',
  'Agreement',
];

const AGREEMENT =
  'By submitting this application, I understand that completing this form does not guarantee adoption of a kitten. ' +
  'Copper Road Maine Coons reserves the right to place kittens in homes that are determined to be the best fit for ' +
  "each kitten's personality and needs.";

export default function ApplyScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const draft = useSelector(selectDraft);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const last = STEPS.length - 1;
  const [step, setStep] = useState(0);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({
    // Your details
    fullName: draft?.fullName || '',
    spouseName: draft?.spouseName || '',
    address: draft?.address || '',
    city: draft?.city || '',
    state: draft?.state || 'SD',
    zip: draft?.zip || '',
    phone: draft?.phone || '',
    email: draft?.email || '',
    contact: draft?.contact || 'Email',

    // Household information
    household: '',
    children: 'No',
    childAges: '',
    householdAgrees: 'Yes',

    // Your home
    own: 'Own',
    landlordAllowsPets: '',
    homeType: 'House',
    homeTypeOther: '',

    // Current pets
    hasPets: 'No',
    petDetails: '',
    petsAltered: '',
    petsVaccinated: '',
    ownedMaineCoon: 'No',

    // About your future kitten
    kitten: 'Any',
    sex: 'Either',
    colorPreference: '',
    purpose: 'Pet Companion',
    polydactyl: 'Either',

    // Care & commitment
    preparedForSize: 'Yes',
    indoorOnly: 'Yes',
    noDeclaw: 'Yes',
    vet: '',
    financiallyPrepared: 'Yes',

    // Lifestyle
    hoursAlone: '',
    whereWhenAway: '',
    lookingFor: '',

    // Agreement
    hear: '',
    comments: '',
    terms: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const { mutate: syncSubmit } = useCustomMutation({ mutationFn: createApplication });
  const { mutate: syncDraft } = useCustomMutation({ mutationFn: saveApplicationDraft });

  const validate = () => {
    if (step === 0) {
      if (!form.fullName) return 'Please tell us your full name.';
      if (!form.email.includes('@')) return 'Please add a valid email address.';
      if (!form.phone) return 'Please add a phone number.';
      if (!form.city || !form.zip) return 'Please complete your city and zip code.';
    }
    if (step === 1 && !form.household) return 'Please tell us who lives in your household.';
    if (step === 1 && form.children === 'Yes' && !form.childAges) return 'Please tell us your children’s ages.';
    if (step === 2 && form.own === 'Rent' && !form.landlordAllowsPets)
      return 'Please let us know whether your landlord allows pets.';
    if (step === 2 && form.homeType === 'Other' && !form.homeTypeOther)
      return 'Please describe the type of home you live in.';
    if (step === 3 && form.hasPets === 'Yes' && !form.petDetails)
      return 'Please tell us about your current pets — species, breed, age, and temperament.';
    if (step === 5 && (!form.hoursAlone || !form.whereWhenAway || !form.lookingFor))
      return 'Please complete the lifestyle questions.';
    if (step === last && form.terms !== 'yes') return 'Please confirm the agreement to submit.';
    return '';
  };

  const next = () => {
    const problem = validate();
    if (problem) {
      setErr(problem);
      return;
    }
    setErr('');
    if (step < last) {
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
      <BackBar title="Forever Home Application" subtitle={`Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`} />
      <Screen contentStyle={styles.body}>
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${((step + 1) / STEPS.length) * 100}%`, backgroundColor: colors.copper },
            ]}
          />
        </View>

        {step === 0 ? (
          <View style={styles.stack}>
            <Eyebrow>YOUR DETAILS</Eyebrow>
            <Typography variant="bodySm" lineHeight={21} mB={8}>
              Thank you for your interest in a Copper Road Maine Coon kitten. This application helps us get to know
              prospective families and make sure each kitten is placed in a home that is the right fit for both the
              family and the kitten.
            </Typography>
            <Field label="Full name">
              <TextField value={form.fullName} onChangeText={v => set('fullName', v)} />
            </Field>
            <Field label="Spouse / partner's name (if applicable)">
              <TextField value={form.spouseName} onChangeText={v => set('spouseName', v)} />
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
                <Field label="Zip code">
                  <TextField value={form.zip} onChangeText={v => set('zip', v)} keyboardType="number-pad" />
                </Field>
              </View>
            </View>
            <Field label="Phone number">
              <TextField value={form.phone} onChangeText={v => set('phone', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Email address">
              <TextField
                value={form.email}
                onChangeText={v => set('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Field>
            <Field label="Best way to contact you?">
              <View style={styles.chipRow}>
                {['Phone', 'Text', 'Email'].map(c => (
                  <Chip key={c} active={form.contact === c} onPress={() => set('contact', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
          </View>
        ) : null}

        {step === 1 ? (
          <View style={styles.stack}>
            <Eyebrow>HOUSEHOLD INFORMATION</Eyebrow>
            <Field label="Who lives in your household?">
              <TextField multiline value={form.household} onChangeText={v => set('household', v)} />
            </Field>
            <Field label="Do you have children?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.children === c} onPress={() => set('children', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            {form.children === 'Yes' ? (
              <Field label="If yes, what are their ages?">
                <TextField value={form.childAges} onChangeText={v => set('childAges', v)} />
              </Field>
            ) : null}
            <Field label="Does everyone in the household agree to bringing a kitten home?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.householdAgrees === c} onPress={() => set('householdAgrees', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.stack}>
            <Eyebrow>YOUR HOME</Eyebrow>
            <Field label="Do you own or rent your home?">
              <View style={styles.chipRow}>
                {['Own', 'Rent'].map(c => (
                  <Chip key={c} active={form.own === c} onPress={() => set('own', c)}>
                    {c === 'Own' ? 'Own your home' : 'Rent your home'}
                  </Chip>
                ))}
              </View>
            </Field>
            {form.own === 'Rent' ? (
              <Field label="If renting, does your landlord allow pets?">
                <TextField
                  value={form.landlordAllowsPets}
                  onChangeText={v => set('landlordAllowsPets', v)}
                  placeholder="Yes — written approval on file"
                />
              </Field>
            ) : null}
            <Field label="What type of home do you live in?">
              <View style={styles.chipWrap}>
                {['House', 'Apartment', 'Condo', 'Farm/Acreage', 'Other'].map(c => (
                  <Chip key={c} active={form.homeType === c} onPress={() => set('homeType', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            {form.homeType === 'Other' ? (
              <Field label="Please describe">
                <TextField value={form.homeTypeOther} onChangeText={v => set('homeTypeOther', v)} />
              </Field>
            ) : null}
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.stack}>
            <Eyebrow>CURRENT PETS</Eyebrow>
            <Field label="Do you currently have other pets?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.hasPets === c} onPress={() => set('hasPets', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            {form.hasPets === 'Yes' ? (
              <>
                <Field label="Please tell us about them (species, breed, age, and temperament)">
                  <TextField multiline value={form.petDetails} onChangeText={v => set('petDetails', v)} />
                </Field>
                <Field label="Are your current pets spayed / neutered?">
                  <TextField value={form.petsAltered} onChangeText={v => set('petsAltered', v)} />
                </Field>
                <Field label="Have your pets been vaccinated regularly?">
                  <TextField value={form.petsVaccinated} onChangeText={v => set('petsVaccinated', v)} />
                </Field>
              </>
            ) : null}
            <Field label="Have you ever owned a Maine Coon before?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.ownedMaineCoon === c} onPress={() => set('ownedMaineCoon', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
          </View>
        ) : null}

        {step === 4 ? (
          <View style={styles.stack}>
            <Eyebrow>ABOUT YOUR FUTURE KITTEN</Eyebrow>
            <Field label="Are you interested in a particular kitten?">
              <SelectField
                value={form.kitten}
                options={['Any', ...kittens.map(k => k.name)]}
                onChange={v => set('kitten', v)}
              />
            </Field>
            <Field label="Are you interested in:">
              <View style={styles.chipRow}>
                {['Male', 'Female', 'Either'].map(c => (
                  <Chip key={c} active={form.sex === c} onPress={() => set('sex', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Do you have a preferred color?">
              <TextField
                value={form.colorPreference}
                onChangeText={v => set('colorPreference', v)}
                placeholder="Black smoke, silver shaded, calico, torbie…"
              />
            </Field>
            <Field label="Will this kitten be:">
              <View style={styles.chipWrap}>
                {['Pet Companion', 'Show Prospect', 'Breeding Prospect (if approved)'].map(c => (
                  <Chip key={c} active={form.purpose === c} onPress={() => set('purpose', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Are you interested in a polydactyl kitten?">
              <View style={styles.chipRow}>
                {['Yes', 'No', 'Either'].map(c => (
                  <Chip key={c} active={form.polydactyl === c} onPress={() => set('polydactyl', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
          </View>
        ) : null}

        {step === 5 ? (
          <View style={styles.stack}>
            <Eyebrow>CARE &amp; COMMITMENT</Eyebrow>
            <Field label="Are you prepared for a Maine Coon that may grow to 15–25+ pounds?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.preparedForSize === c} onPress={() => set('preparedForSize', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Will your kitten be an indoor-only cat?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.indoorOnly === c} onPress={() => set('indoorOnly', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Do you agree that declawing is not an option?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.noDeclaw === c} onPress={() => set('noDeclaw', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>
            <Field label="Have you identified a veterinarian for your kitten?">
              <TextField value={form.vet} onChangeText={v => set('vet', v)} placeholder="Clinic name, or 'not yet'" />
            </Field>
            <Field label="Are you financially prepared for routine and emergency veterinary care?">
              <View style={styles.chipRow}>
                {['Yes', 'No'].map(c => (
                  <Chip key={c} active={form.financiallyPrepared === c} onPress={() => set('financiallyPrepared', c)}>
                    {c}
                  </Chip>
                ))}
              </View>
            </Field>

            <Eyebrow style={styles.sectionGap}>LIFESTYLE</Eyebrow>
            <Field label="How many hours per day will the kitten typically be alone?">
              <TextField value={form.hoursAlone} onChangeText={v => set('hoursAlone', v)} />
            </Field>
            <Field label="Where will your kitten stay when you are away from home?">
              <TextField multiline value={form.whereWhenAway} onChangeText={v => set('whereWhenAway', v)} />
            </Field>
            <Field label="What are you looking for in a Maine Coon companion?">
              <TextField multiline value={form.lookingFor} onChangeText={v => set('lookingFor', v)} />
            </Field>
          </View>
        ) : null}

        {step === last ? (
          <View style={styles.stack}>
            <Eyebrow>AGREEMENT</Eyebrow>
            <View style={s.summary}>
              <Typography size={15} font="bodySemiBold">
                {form.fullName || 'Your name'}
                {form.spouseName ? ` & ${form.spouseName}` : ''}
              </Typography>
              <Typography size={14}>
                {form.email} · {form.phone}
              </Typography>
              <Typography size={14}>
                {form.city}, {form.state} {form.zip}
              </Typography>
              <Typography size={14} mT={8}>
                Kitten: {form.kitten} · {form.sex} · {form.purpose}
              </Typography>
              <Typography size={14}>Polydactyl: {form.polydactyl}</Typography>
            </View>
            <Field label="Anything else you would like us to know?">
              <TextField multiline value={form.comments} onChangeText={v => set('comments', v)} />
            </Field>
            <Field label="How did you hear about us? (optional)">
              <SelectField value={form.hear} options={hearAbout} placeholder="Choose one" onChange={v => set('hear', v)} />
            </Field>
            <Typography variant="bodySm" lineHeight={21} mT={4} mB={8}>
              {AGREEMENT}
            </Typography>
            <Agree
              on={form.terms === 'yes'}
              onPress={() => set('terms', form.terms === 'yes' ? '' : 'yes')}
              label="I have read and understand the agreement above."
            />
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
            <Btn full title={step === last ? 'Submit Application' : 'Next'} onPress={next} />
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
  sectionGap: { marginTop: Sizer.vSize(20) },
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
