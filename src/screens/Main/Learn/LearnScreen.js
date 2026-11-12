import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { OVERLAY, RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { Btn, Chip, Gradient, HomeHeader, Photo, Screen, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { articleCategories, articles, videos } from '../../../lib/copper-data';

/** The web shortens two long category names for the chip row. */
const shortLabel = c =>
  c.replace('Meet The Maine Coon', 'The Breed').replace('Understanding Pedigrees & TICA', 'Pedigrees');

/** Ported from Project/src/components/cr/learn.tsx — LearnScreen. */
export default function LearnScreen({ navigation }) {
  const colors = useColors();
  const s = useMemo(() => makeStyles(colors), [colors]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const list = articles.filter(
    a => (category === 'All' || a.category === category) && a.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={s.root}>
      <HomeHeader>
        <Typography size={34} lineHeight={34} font="displaySemiBold" color="#FFFFFF">
          Essential Kitten &amp; Maine Coon Education
        </Typography>
        <Typography size={12} color="rgba(255,255,255,0.70)" mT={8}>
          Sample content for the client to review and approve before launch.
        </Typography>
      </HomeHeader>

      <Screen padded={false} tabPad>
        <View style={styles.body}>
          <TextField value={query} onChangeText={setQuery} placeholder="Search care guides" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {articleCategories.map(c => (
            <Chip key={c} active={category === c} onPress={() => setCategory(c)}>
              {shortLabel(c)}
            </Chip>
          ))}
        </ScrollView>

        <View style={styles.body}>
          <View style={styles.stack}>
            {list.map(a => (
              <Pressable
                key={a.id}
                onPress={() => navigation.navigate('ArticleScreen', { id: a.id })}
                style={({ pressed }) => [s.row, { opacity: pressed ? 0.92 : 1 }]}
              >
                <Photo source={a.image} style={styles.rowPhoto} radius={RADIUS.md} />
                <View style={styles.rowBody}>
                  <Typography size={11} font="bodySemiBold" color="copper" letterSpacing={1.54} textTransform="uppercase">
                    {a.category}
                  </Typography>
                  <Typography variant="displayMd" lineHeight={26} mT={2}>
                    {a.title}
                  </Typography>
                  <Typography variant="tiny">{a.minutes} min read</Typography>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.guides}>
            <View style={styles.flex}>
              <Btn full variant="outline" title="New Kitten Checklist" onPress={() => navigation.navigate('GuideScreen', { id: 'checklist' })} />
            </View>
            <View style={styles.flex}>
              <Btn full variant="outline" title="Feeding Guide" onPress={() => navigation.navigate('GuideScreen', { id: 'feeding' })} />
            </View>
          </View>

          <Typography variant="displayMd" mT={20} mB={12}>
            Video tutorials
          </Typography>
          <View style={styles.stack}>
            {videos.map(v => (
              <Pressable
                key={v.id}
                onPress={() => navigation.navigate('ArticleScreen', { id: 'grooming' })}
                style={styles.video}
              >
                <Photo source={v.image} style={styles.videoPhoto} />
                <Gradient
                  colors={['transparent', `${colors.navy}80`]}
                  style={OVERLAY}
                  pointerEvents="none"
                />
                <View style={styles.videoBody}>
                  <Typography size={12} color="#FFFFFF">
                    ▶ {v.length} · placeholder
                  </Typography>
                  <Typography variant="displayMd" color="#FFFFFF">
                    {v.title}
                  </Typography>
                </View>
              </Pressable>
            ))}
          </View>

          <Btn full title="Ask Our Breeder" style={styles.cta} onPress={() => navigation.navigate('ContactScreen')} />
        </View>
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    row: {
      flexDirection: 'row',
      gap: Sizer.hSize(12),
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(8),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(16), paddingTop: Sizer.vSize(12) },
  chips: { gap: Sizer.hSize(8), paddingHorizontal: Sizer.hSize(16), paddingVertical: Sizer.vSize(12) },
  stack: { gap: Sizer.vSize(12) },
  rowPhoto: { width: Sizer.hSize(96), height: Sizer.hSize(96) },
  rowBody: { flex: 1, paddingVertical: Sizer.vSize(4) },
  guides: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(12) },
  video: { borderRadius: RADIUS.xxxl, overflow: 'hidden' },
  videoPhoto: { width: '100%', height: Sizer.vSize(144) },
  videoBody: { position: 'absolute', left: Sizer.hSize(12), bottom: Sizer.vSize(12) },
  cta: { marginTop: Sizer.vSize(16) },
});
