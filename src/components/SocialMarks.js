import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Sizer from '../helpers/Sizer';

/**
 * The four social marks from the home footer.
 *
 * `@react-native-vector-icons/lucide` ships no brand glyphs, so `instagram`
 * and `facebook` — which the web imports from `lucide-react` — are not in the
 * font. All four are drawn here instead; X and LinkedIn use the same paths the
 * web inlines.
 */

export function InstagramMark({ size = 16, color = '#FFFFFF' }) {
  const s = Sizer.fS(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <Rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <Path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <Path d="M17.5 6.5h.01" />
    </Svg>
  );
}

export function FacebookMark({ size = 16, color = '#FFFFFF' }) {
  const s = Sizer.fS(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  );
}

export function XMark({ size = 16, color = '#FFFFFF' }) {
  const s = Sizer.fS(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
      <Path d="M14.7 10.3 22 2h-2.2l-6.3 7.2L8.2 2H2l7.7 11L2 22h2.2l6.8-7.8L15.2 22H22l-7.3-11.7Zm-2.4 2.8-.8-1.1L5 3.5h2.7l5 7.2.8 1.1 6.6 9.2h-2.7l-5.1-7.9Z" />
    </Svg>
  );
}

export function LinkedInMark({ size = 16, color = '#FFFFFF' }) {
  const s = Sizer.fS(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
      <Path d="M4.7 3.3A2.2 2.2 0 1 0 4.7 7.7 2.2 2.2 0 0 0 4.7 3.3ZM3 9h3.4v12H3V9Zm6.2 0H12.5v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V21H16v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9.2V9Z" />
    </Svg>
  );
}

export const SOCIAL_MARKS = [
  { label: 'Instagram', Mark: InstagramMark },
  { label: 'Facebook', Mark: FacebookMark },
  { label: 'X', Mark: XMark },
  { label: 'LinkedIn', Mark: LinkedInMark },
];
