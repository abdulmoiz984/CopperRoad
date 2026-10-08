import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import { RADIUS } from '../../../globalStyle/Theme';
import { BackBar, Photo, Screen, Viewer } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { galleryPhotos } from '../../../lib/copper-data';

/** Ported from Project/src/components/cr/cats.tsx — GalleryScreen. */
export default function GalleryScreen() {
  const colors = useColors();
  const [index, setIndex] = useState(null);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title="Gallery" subtitle="Life At Copper Road" />
      <Screen padded={false} contentStyle={styles.body}>
        <View style={styles.grid}>
          {galleryPhotos.map((p, n) => (
            <Pressable key={n} onPress={() => setIndex(n)} style={styles.cell}>
              <Photo source={p.src} style={styles.fill} radius={RADIUS.md} />
            </Pressable>
          ))}
        </View>
      </Screen>

      {index != null ? (
        <Viewer photos={galleryPhotos} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(12) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Sizer.hSize(8) },
  cell: { width: '48%', aspectRatio: 1 },
  fill: { width: '100%', height: '100%' },
});
