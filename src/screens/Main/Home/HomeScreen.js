import React, { useMemo, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OVERLAY, RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import {
  ApplyFab,
  Badge,
  Btn,
  Divider,
  Eyebrow,
  Field,
  Gradient,
  HeartBtn,
  HomeHeader,
  Photo,
  SOCIAL_MARKS,
  Screen,
  StarPicker,
  Stars,
  TextField,
  statusTone,
} from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useCustomMutation } from '../../../query';
import { createReview } from '../../../api/contentService';
import {
  CONTACT,
  cats,
  galleryPhotos,
  kittens,
  pillars,
  products,
  trustBadges,
} from '../../../lib/copper-data';
import { IMAGES } from '../../../assets/images';
import { addReview, selectFavKittens, selectReviews, toggleFavKitten } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';

const QUEEN_IDS = ['aria', 'olive', 'kiki', 'chimera'];
const KING_IDS = ['roman', 'royal', 'butter', 'armani'];

/** Ported from Project/src/components/cr/home.tsx — HomeScreen. */
export default function HomeScreen({ navigation }) {
  const colors = useColors();
  const dispatch = useDispatch();
  const favKittens = useSelector(selectFavKittens);
  const reviews = useSelector(selectReviews);
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quote, setQuote] = useState('');
  const [stars, setStars] = useState(5);
  const [err, setErr] = useState('');

  const { mutate: syncReview } = useCustomMutation({ mutationFn: createReview });

  const queens = cats.filter(c => QUEEN_IDS.includes(c.id));
  const kings = cats.filter(c => KING_IDS.includes(c.id));
  const review = reviews[quoteIndex % reviews.length];

  const goTab = tab => navigation.navigate(tab);

  function submitReview() {
    if (!name || !email.includes('@') || quote.length < 8) {
      setErr('Please add your name, email, and a short review.');
      return;
    }
    setErr('');
    const payload = { name, location: 'Copper Road family', stars, quote };
    dispatch(addReview(payload));
    syncReview(payload);
    toast('Thank you for sharing your experience');
    setName('');
    setEmail('');
    setQuote('');
  }

  return (
    <View style={s.root}>
      <HomeHeader />
      <Screen padded={false} tabPad>
        {/* Hero */}
        <View style={styles.hero}>
          <Photo source={IMAGES.rectangle6} style={styles.fill} />
          <Gradient
            colors={['transparent', `${colors.navy}59`, colors.navy]}
            style={OVERLAY}
            pointerEvents="none"
          />
          <View style={styles.heroBody}>
            <Eyebrow light>Breeding Healthy, Happy Maine Coon Cats</Eyebrow>
            <Typography size={40} lineHeight={38} font="displaySemiBold" color="#FFFFFF" mT={8}>
              COPPER ROAD MAINE COONS
            </Typography>
            <View style={styles.heroActions}>
              <Btn title="Submit An Application" onPress={() => navigation.navigate('ApplyScreen')} />
              <Btn variant="light" title="Meet Our Parents" onPress={() => goTab('CatsTab')} />
            </View>
          </View>
        </View>

        {/* Trust badges */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.strip} contentContainerStyle={styles.stripInner}>
          {trustBadges.map(b => (
            <View key={b} style={s.trust}>
              <Typography size={12} font="bodySemiBold">
                {b}
              </Typography>
            </View>
          ))}
        </ScrollView>

        {/* Available kittens */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Typography variant="displayLg" flex={1}>
              Available Kittens
            </Typography>
            <Typography size={14} font="bodySemiBold" color="copper" onPress={() => goTab('CatsTab')}>
              View All
            </Typography>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
          {kittens.map(k => (
            <Pressable
              key={k.id}
              onPress={() => navigation.navigate('KittenDetailScreen', { id: k.id })}
              style={({ pressed }) => [s.kittenCard, { opacity: pressed ? 0.92 : 1 }]}
            >
              <View>
                <Photo source={k.photo} style={styles.kittenPhoto} />
                <View style={styles.badgeTL}>
                  <Badge tone={statusTone(k.status)}>{k.status}</Badge>
                </View>
                <View style={styles.heartTR}>
                  <HeartBtn on={favKittens.includes(k.id)} onPress={() => dispatch(toggleFavKitten(k.id))} />
                </View>
              </View>
              <View style={styles.cardBody}>
                <Typography variant="displayMd">{k.name}</Typography>
                <Typography variant="tiny" mT={2}>
                  {k.coat} · {k.sex}
                </Typography>
                <Typography size={14} font="bodySemiBold" color="copper" mT={8}>
                  View Details
                </Typography>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Parents */}
        <CatRow title="Meet The Queens Of Copper Road" list={queens} navigation={navigation} colors={colors} />
        <CatRow title="Meet The Kings Of Copper Road" list={kings} navigation={navigation} colors={colors} />

        {/* Family */}
        <View style={styles.section}>
          <Typography variant="displayLg">Forever Part Of Our Family</Typography>
          <Divider />
          <View style={styles.stack}>
            {['london', 'rudi'].map(id => {
              const c = cats.find(x => x.id === id);
              if (!c) return null;
              return (
                <Pressable
                  key={id}
                  onPress={() => navigation.navigate('CatProfileScreen', { id })}
                  style={({ pressed }) => [s.familyCard, { opacity: pressed ? 0.92 : 1 }]}
                >
                  <Photo source={c.photo} style={styles.familyPhoto} radius={RADIUS.md} />
                  <View style={styles.flex}>
                    <Typography size={11} font="bodySemiBold" color="copper" letterSpacing={1.76} textTransform="uppercase">
                      {c.role === 'memorial' ? 'In Loving Memory' : 'Meet London'}
                    </Typography>
                    <Typography variant="displayMd" mT={2}>
                      {c.role === 'memorial' ? 'RUDI, The Heart Of Copper Road' : c.name}
                    </Typography>
                    <Typography variant="bodySm" mT={2}>
                      {c.tagline}
                    </Typography>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Pillars */}
        <View style={styles.section}>
          <Eyebrow>RESPONSIBLE BREEDING</Eyebrow>
          <Typography variant="displayLg" mT={4}>
            Beauty Begins With Health.
          </Typography>
          <View style={styles.grid}>
            {pillars.map(p => (
              <Pressable
                key={p.id}
                onPress={() => navigation.navigate('BreedingScreen')}
                style={({ pressed }) => [s.pillar, { opacity: pressed ? 0.92 : 1 }]}
              >
                <View style={[styles.pillarRule, { backgroundColor: colors.copper }]} />
                <Typography variant="displaySm">{p.title}</Typography>
                <Typography size={12} lineHeight={18} color="mutedForeground" mT={4}>
                  {p.text}
                </Typography>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Life at Copper Road */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Typography variant="displayLg" flex={1}>
              Life At Copper Road
            </Typography>
            <Typography size={14} font="bodySemiBold" color="copper" onPress={() => navigation.navigate('GalleryScreen')}>
              View Gallery
            </Typography>
          </View>
          <View style={styles.mosaic}>
            {galleryPhotos.slice(0, 8).map((p, i) => (
              <Pressable
                key={`${i}`}
                onPress={() => navigation.navigate('GalleryScreen')}
                style={i === 0 ? styles.mosaicLarge : styles.mosaicCell}
              >
                <Photo source={p.src} style={styles.fill} radius={RADIUS.md} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Testimonial */}
        <View style={styles.section}>
          <Typography variant="displayLg" mB={12}>
            Loved By Copper Road Families
          </Typography>
          <Pressable onPress={() => setQuoteIndex(i => i + 1)} style={s.card}>
            <Stars value={review.stars} />
            <Typography size={14} lineHeight={21} mT={8}>
              “{review.quote}”
            </Typography>
            <Typography size={14} font="bodySemiBold" mT={12}>
              {review.name} – {review.location}
            </Typography>
            <Typography variant="micro" mT={2}>
              Tap for the next story
            </Typography>
          </Pressable>
          <Typography
            size={14}
            font="bodySemiBold"
            color="copper"
            mT={8}
            onPress={() => navigation.navigate('TestimonialsScreen')}
          >
            Read All Testimonials
          </Typography>
        </View>

        {/* Share your experience */}
        <View style={[s.card, styles.reviewCard]}>
          <Typography variant="displayLg">Share Your Copper Road Experience</Typography>
          <Typography variant="bodySm" mT={4}>
            Allow families to submit their own review directly through the app.
          </Typography>
          <View style={styles.reviewForm}>
            <Field label="Name">
              <TextField value={name} onChangeText={setName} />
            </Field>
            <Field label="Email">
              <TextField value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </Field>
            <Field label="Review" error={err}>
              <TextField multiline value={quote} onChangeText={setQuote} placeholder="Tell us about your kitten…" />
            </Field>
            <StarPicker value={stars} onChange={setStars} />
            <Btn full title="Submit Review" style={styles.cta} onPress={submitReview} />
          </View>
        </View>

        {/* Shop promo */}
        <View style={[s.promo, { backgroundColor: colors.navy }]}>
          <Photo source={products[1].image} style={styles.promoPhoto} />
          <View style={styles.promoBody}>
            <Typography variant="displayLg" color="#FFFFFF">
              Take A Little Copper Road Home With You
            </Typography>
            <Typography size={14} color="rgba(255,255,255,0.75)" mT={4}>
              Cattery merchandise for Maine Coon lovers and Copper Road families.
            </Typography>
            <View style={styles.promoChips}>
              {['Apparel', 'Mugs & Drinkware', 'Accessories'].map(label => (
                <Pressable key={label} onPress={() => goTab('ShopTab')} style={styles.promoChip}>
                  <Typography size={14} font="bodySemiBold" color="#FFFFFF">
                    {label}
                  </Typography>
                </Pressable>
              ))}
            </View>
            <Btn title="Shop Merchandise" style={styles.cta} onPress={() => goTab('ShopTab')} />
          </View>
        </View>

        {/* Closing */}
        <View style={styles.closing}>
          <Typography size={36} font="displaySemiBold" textAlign="center">
            Some Connections Last A Lifetime.
          </Typography>
          <Typography variant="bodySm" lineHeight={21} textAlign="center" mT={8}>
            From our home to yours, we're proud to share our love of Maine Coons with families who understand that these
            aren't just pets—they're family.
          </Typography>
          <Btn title="Submit An Application" style={styles.cta} onPress={() => navigation.navigate('ApplyScreen')} />
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.navy }]}>
          <Image source={IMAGES.footerLogo} style={styles.footerLogo} resizeMode="contain" />
          <Typography size={14} lineHeight={22} color="rgba(255,255,255,0.80)" mT={16}>
            {CONTACT.street}
            {'\n'}
            {CONTACT.city}
          </Typography>
          <Typography
            size={14}
            color="rgba(255,255,255,0.80)"
            onPress={() => Linking.openURL(CONTACT.emailHref).catch(() => {})}
          >
            {CONTACT.email}
          </Typography>
          <Typography
            size={14}
            color="rgba(255,255,255,0.80)"
            onPress={() => Linking.openURL(CONTACT.phoneHref).catch(() => {})}
          >
            {CONTACT.phone}
          </Typography>

          <View style={styles.socialRow}>
            {SOCIAL_MARKS.map(({ label, Mark }) => (
              <Pressable
                key={label}
                onPress={() => Linking.openURL(CONTACT.emailHref).catch(() => {})}
                style={[styles.social, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
              >
                <Mark size={16} color="#FFFFFF" />
              </Pressable>
            ))}
          </View>

          <View style={styles.legalRow}>
            <Typography
              size={14}
              color="#FFFFFF"
              onPress={() => navigation.navigate('LegalScreen', { doc: 'terms' })}
            >
              Terms &amp; Conditions
            </Typography>
            <Typography
              size={14}
              color="#FFFFFF"
              onPress={() => navigation.navigate('LegalScreen', { doc: 'privacy' })}
            >
              Privacy Policy
            </Typography>
          </View>
          <Typography size={12} color="rgba(255,255,255,0.60)" mT={16}>
            Copyright 2026 – Copper Road Maine Coon Cattery
          </Typography>
        </View>
      </Screen>

      {/* The web floats the Apply pill over Home and Cats only. */}
      <ApplyFab />
    </View>
  );
}

/** The horizontally scrolling parent rows. */
function CatRow({ title, list, navigation, colors }) {
  const s = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={styles.catRow}>
      <Typography variant="displayLg" style={styles.catRowTitle}>
        {title}
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
        {list.map(c => (
          <Pressable
            key={c.id}
            onPress={() => navigation.navigate('CatProfileScreen', { id: c.id })}
            style={({ pressed }) => [s.catCard, { opacity: pressed ? 0.92 : 1 }]}
          >
            <Photo source={c.photo} style={styles.catPhoto} />
            <View style={styles.cardBody}>
              <Typography variant="displayMd">{c.short}</Typography>
              <Typography variant="tiny" mT={4}>
                {c.tagline}
              </Typography>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    trust: {
      borderRadius: RADIUS.pill,
      borderWidth: 1,
      borderColor: `${colors.copper}66`,
      backgroundColor: colors.card,
      paddingHorizontal: Sizer.hSize(12),
      paddingVertical: Sizer.vSize(8),
    },
    kittenCard: {
      width: Sizer.hSize(224),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
    catCard: {
      width: Sizer.hSize(176),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      overflow: 'hidden',
      ...softShadow(colors),
    },
    familyCard: {
      flexDirection: 'row',
      gap: Sizer.hSize(12),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(12),
      ...softShadow(colors),
    },
    pillar: {
      width: '48%',
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
    card: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
    promo: {
      marginHorizontal: Sizer.hSize(16),
      borderRadius: RADIUS.xxxl,
      overflow: 'hidden',
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fill: { width: '100%', height: '100%' },

  hero: { height: Sizer.vSize(280), overflow: 'hidden' },
  heroBody: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: Sizer.hSize(20) },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8), marginTop: Sizer.vSize(16) },

  strip: { marginTop: Sizer.vSize(16) },
  stripInner: { gap: Sizer.hSize(8), paddingHorizontal: Sizer.hSize(16), paddingBottom: Sizer.vSize(16) },

  section: { paddingHorizontal: Sizer.hSize(16), paddingTop: Sizer.vSize(8), paddingBottom: Sizer.vSize(8) },
  sectionHead: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: Sizer.vSize(12) },
  stack: { gap: Sizer.vSize(12), marginTop: Sizer.vSize(12) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(12), marginTop: Sizer.vSize(12) },

  cardRow: { gap: Sizer.hSize(12), paddingHorizontal: Sizer.hSize(16), paddingBottom: Sizer.vSize(8) },
  kittenPhoto: { width: '100%', height: Sizer.vSize(176) },
  catPhoto: { width: '100%', height: Sizer.vSize(192) },
  cardBody: { padding: Sizer.hSize(12) },
  badgeTL: { position: 'absolute', left: Sizer.hSize(8), top: Sizer.vSize(8) },
  heartTR: { position: 'absolute', right: Sizer.hSize(8), top: Sizer.vSize(8) },

  catRow: { paddingTop: Sizer.vSize(12), paddingBottom: Sizer.vSize(4) },
  catRowTitle: { paddingHorizontal: Sizer.hSize(16), marginBottom: Sizer.vSize(12) },

  familyPhoto: { width: Sizer.hSize(96), height: Sizer.hSize(96) },
  pillarRule: { width: Sizer.hSize(32), height: 1, marginBottom: Sizer.vSize(8) },

  mosaic: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(6) },
  mosaicCell: { width: '23%', aspectRatio: 1 },
  mosaicLarge: { width: '48%', aspectRatio: 1 },

  reviewCard: { marginHorizontal: Sizer.hSize(16), marginVertical: Sizer.vSize(16) },
  reviewForm: { marginTop: Sizer.vSize(12) },
  cta: { marginTop: Sizer.vSize(12) },

  promoPhoto: { width: '100%', height: Sizer.vSize(160) },
  promoBody: { padding: Sizer.hSize(20) },
  promoChips: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8), marginTop: Sizer.vSize(12) },
  promoChip: {
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: Sizer.hSize(12),
    paddingVertical: Sizer.vSize(12),
  },

  closing: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(32), alignItems: 'center' },

  footer: { paddingHorizontal: Sizer.hSize(20), paddingVertical: Sizer.vSize(32) },
  footerLogo: { width: Sizer.hSize(140), height: Sizer.vSize(64) },
  socialRow: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(16) },
  social: {
    width: Sizer.hSize(44),
    height: Sizer.hSize(44),
    borderRadius: Sizer.hSize(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalRow: { flexDirection: 'row', gap: Sizer.hSize(16), marginTop: Sizer.vSize(16) },
});
