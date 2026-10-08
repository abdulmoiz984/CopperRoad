import React, { useRef, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS } from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';
import { Typography } from '../atomComponents';
import { useColors } from '../hooks/useTheme';
import { usePageWidth } from '../hooks/usePageWidth';

/**
 * Full-screen photo viewer — the web's `Viewer`. Swiping between photos is a
 * paged ScrollView here rather than the web's touch-delta maths; the Prev/Next
 * controls and the `n / total` counter carry over unchanged.
 */
export function Viewer({ photos = [], index = 0, onClose, onIndex }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [width, onPageLayout] = usePageWidth();
  const scroller = useRef(null);
  const [zoomed, setZoomed] = useState(false);

  const open = index != null && index >= 0 && photos.length > 0;
  if (!open) return null;

  const go = n => {
    const next = (n + photos.length) % photos.length;
    onIndex?.(next);
    scroller.current?.scrollTo({ x: next * width, animated: true });
  };

  return (
    <Modal visible transparent={false} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.root, { backgroundColor: colors.navy, paddingTop: insets.top }]} onLayout={onPageLayout}>
        <View style={styles.bar}>
          <Pressable onPress={onClose} hitSlop={8} style={styles.barBtn}>
            <Typography size={14} color="#FFFFFF">
              Close
            </Typography>
          </Pressable>
          <Typography size={14} color="#FFFFFF">
            {index + 1} / {photos.length}
          </Typography>
          <Pressable onPress={() => setZoomed(z => !z)} hitSlop={8} style={styles.barBtn}>
            <Typography size={14} color="#FFFFFF">
              {zoomed ? 'Reset' : 'Zoom'}
            </Typography>
          </Pressable>
        </View>

        <ScrollView
          ref={scroller}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: index * width, y: 0 }}
          onMomentumScrollEnd={e => {
            const page = Math.round(e.nativeEvent.contentOffset.x / width);
            if (page !== index) onIndex?.(page);
          }}
          style={styles.flex}
        >
          {photos.map((p, n) => (
            <Pressable key={n} onPress={() => setZoomed(z => !z)} style={{ width }}>
              <Image
                source={p.src ?? p}
                resizeMode={zoomed ? 'cover' : 'contain'}
                style={styles.photo}
              />
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, Sizer.vSize(16)) }]}>
          <Pressable onPress={() => go(index - 1)} style={styles.navBtn}>
            <Typography size={14} color="#FFFFFF">
              Prev
            </Typography>
          </Pressable>
          <Pressable onPress={() => go(index + 1)} style={styles.navBtn}>
            <Typography size={14} color="#FFFFFF">
              Next
            </Typography>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizer.hSize(12),
    paddingVertical: Sizer.vSize(12),
  },
  barBtn: { minHeight: Sizer.vSize(44), justifyContent: 'center', paddingHorizontal: Sizer.hSize(12) },
  photo: { width: '100%', height: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizer.hSize(16), paddingTop: Sizer.vSize(16) },
  navBtn: {
    minHeight: Sizer.vSize(44),
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: Sizer.hSize(16),
  },
});

export default Viewer;
