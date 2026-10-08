import React, { useId, useState } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

/**
 * A vertical gradient drawn with react-native-svg.
 *
 * Two React Native quirks shape this component:
 *
 * 1. `react-native-linear-gradient` is a dependency but is NOT used. On RN
 *    0.87's New Architecture its native view lays out wider than its parent
 *    and offsets its children, which clipped headings and pushed footers
 *    off-screen.
 * 2. `<Svg>` does not resolve a percentage width from `style` on Android — it
 *    painted roughly 87% of the element and left a seam down the right edge.
 *    The box is measured and passed as numeric `width`/`height` props, with a
 *    1×1 viewBox and `preserveAspectRatio="none"` so the unit square stretches
 *    to fill it exactly.
 *
 * Pass `children` to use it as a container, or leave it empty and give it an
 * absolute-fill style to use it as an overlay.
 */
export function Gradient({ colors = [], locations, style, children, pointerEvents, horizontal }) {
  // Unique per instance so two gradients on one screen cannot collide.
  const id = `grad${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [box, setBox] = useState({ width: 0, height: 0 });

  const stops = colors.map((color, i) => {
    const offset = locations?.[i] ?? (colors.length === 1 ? 0 : i / (colors.length - 1));
    // rgba() has to be split: SVG takes the alpha as a separate attribute.
    const match = /rgba?\(([^)]+)\)/.exec(color);
    if (match) {
      const parts = match[1].split(',').map(p => p.trim());
      return {
        offset,
        color: `rgb(${parts.slice(0, 3).join(',')})`,
        opacity: parts[3] != null ? Number(parts[3]) : 1,
      };
    }
    // `#RRGGBBAA` — react-native-svg wants the alpha separately here too.
    if (/^#[0-9a-f]{8}$/i.test(color)) {
      return { offset, color: color.slice(0, 7), opacity: parseInt(color.slice(7), 16) / 255 };
    }
    if (color === 'transparent') return { offset, color: '#000000', opacity: 0 };
    return { offset, color, opacity: 1 };
  });

  const onLayout = e => {
    const { width, height } = e.nativeEvent.layout;
    if (Math.abs(width - box.width) > 1 || Math.abs(height - box.height) > 1) {
      setBox({ width, height });
    }
  };

  return (
    <View style={style} pointerEvents={pointerEvents} onLayout={onLayout}>
      {box.width > 0 && box.height > 0 ? (
        <Svg
          width={box.width}
          height={box.height}
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          pointerEvents="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient
              id={id}
              x1="0"
              y1="0"
              x2={horizontal ? '1' : '0'}
              y2={horizontal ? '0' : '1'}
            >
              {stops.map((s, i) => (
                <Stop key={i} offset={s.offset} stopColor={s.color} stopOpacity={s.opacity} />
              ))}
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="1" height="1" fill={`url(#${id})`} />
        </Svg>
      ) : null}
      {children}
    </View>
  );
}

export default Gradient;
