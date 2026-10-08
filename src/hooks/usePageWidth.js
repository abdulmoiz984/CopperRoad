import { useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Width of a full-bleed paging container, measured rather than taken from
 * `useWindowDimensions`.
 *
 * On Android the first render reported a narrower window (360dp) than the
 * final layout (411dp), so slides sized from the window value stopped short of
 * the right edge and left a seam. The window value is still the initial guess,
 * so the first paint is right on iOS, and `onLayout` corrects it.
 *
 *   const [pageWidth, onLayout] = usePageWidth();
 *   <View onLayout={onLayout}>…</View>
 */
export function usePageWidth() {
  const { width } = useWindowDimensions();
  const [pageWidth, setPageWidth] = useState(width);

  const onLayout = useCallback(
    e => {
      const next = e.nativeEvent.layout.width;
      if (next && Math.abs(next - pageWidth) > 1) setPageWidth(next);
    },
    [pageWidth],
  );

  return [pageWidth, onLayout];
}

export default usePageWidth;
