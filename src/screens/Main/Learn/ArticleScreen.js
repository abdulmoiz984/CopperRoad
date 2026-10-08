import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RADIUS } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Photo, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { articles } from '../../../lib/copper-data';
import { shareText, toast } from '../../../utils';

/** Ported from Project/src/components/cr/learn.tsx — ArticleScreen. */
export default function ArticleScreen({ route }) {
  const colors = useColors();
  const [saved, setSaved] = useState(false);
  const article = useMemo(
    () => articles.find(a => a.id === route.params?.id) ?? articles[0],
    [route.params],
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Screen padded={false}>
        <Photo source={article.image} style={styles.hero} />
        <BackBar title={article.title} subtitle={`${article.minutes} min · ${article.category}`} />

        <View style={styles.body}>
          {article.blocks.map((b, i) => {
            if (b.type === 'h') {
              return (
                <Typography key={i} variant="displayMd" mT={8}>
                  {b.text}
                </Typography>
              );
            }
            if (b.type === 'ul') {
              return (
                <View key={i} style={styles.list}>
                  {b.items.map(item => (
                    <View key={item} style={styles.listItem}>
                      <Typography size={14} lineHeight={21}>
                        •
                      </Typography>
                      <Typography size={14} lineHeight={21} flex={1}>
                        {item}
                      </Typography>
                    </View>
                  ))}
                </View>
              );
            }
            if (b.type === 'note') {
              return (
                <View key={i} style={[styles.note, { backgroundColor: `${colors.copper}26` }]}>
                  <Typography size={12} lineHeight={18}>
                    {b.text}
                  </Typography>
                </View>
              );
            }
            return (
              <Typography key={i} size={15} lineHeight={23}>
                {b.text}
              </Typography>
            );
          })}

          <View style={styles.actions}>
            <View style={styles.flex}>
              <Btn
                full
                variant="outline"
                title={saved ? 'Saved' : 'Save'}
                onPress={() => {
                  toast(saved ? 'Already saved' : 'Guide saved');
                  setSaved(true);
                }}
              />
            </View>
            <Btn
              variant="navy"
              title="Share"
              icon={<Icon name="share-2" size={Sizer.fS(16)} color="#FFFFFF" />}
              onPress={() => shareText(article.title)}
            />
          </View>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  hero: { width: '100%', height: Sizer.vSize(224) },
  body: { paddingHorizontal: Sizer.hSize(20), gap: Sizer.vSize(12) },
  list: { gap: Sizer.vSize(4), paddingLeft: Sizer.hSize(8) },
  listItem: { flexDirection: 'row', gap: Sizer.hSize(8) },
  note: { borderRadius: RADIUS.md, padding: Sizer.hSize(12) },
  actions: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(8) },
});
