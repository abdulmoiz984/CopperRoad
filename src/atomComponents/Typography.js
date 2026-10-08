import React from 'react';
import { Platform, Text } from 'react-native';
import { FONTS, moderateType, TYPE } from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';
import { useColors } from '../hooks/useTheme';

/**
 * Single text primitive. `variant` pulls a preset from Theme.TYPE, whose
 * `color` is a *token name* resolved against the active palette — that is what
 * lets the theme toggle recolour every string at once.
 */
const Typography = ({
  variant,
  color,
  size,
  font,
  letterSpacing,
  lineHeight,
  textTransform,
  textAlign = 'left',
  numberOfLines,
  flex,
  mT = 0, mB = 0, mL = 0, mR = 0,
  pT = 0, pB = 0, pL = 0, pR = 0,
  children,
  style,
  onPress,
  ...props
}) => {
  const colors = useColors();
  const preset = variant ? TYPE[variant] : null;

  const baseSize = size ?? preset?.size ?? 15;
  const resolvedSize = moderateType(baseSize);
  const sizeRatio = resolvedSize / baseSize;

  // `color` accepts a literal or a palette token name.
  const rawColor = color ?? preset?.color ?? 'foreground';
  const resolvedColor = colors[rawColor] ?? rawColor;

  const family = FONTS[font ?? preset?.font ?? 'bodyRegular'];
  const resolvedSpacing = letterSpacing ?? preset?.letterSpacing;
  const resolvedTransform = textTransform ?? preset?.textTransform;
  const resolvedLineHeight =
    lineHeight != null
      ? Sizer.fS(lineHeight * sizeRatio)
      : preset?.lineHeight != null
        ? Sizer.fS(preset.lineHeight * sizeRatio)
        : undefined;

  return (
    <Text
      style={[
        {
          color: resolvedColor,
          fontSize: Sizer.fS(resolvedSize),
          fontFamily: family,
          textAlign,
          // Only emitted when non-zero. Writing `paddingLeft: 0` unconditionally
          // beat any `padding` passed through `style` — React Native gives the
          // longhand precedence over the shorthand regardless of order — which
          // silently zeroed the padding on card titles and clipped their first
          // glyph against an `overflow: hidden` parent.
          ...(mT ? { marginTop: Sizer.vSize(mT) } : null),
          ...(mB ? { marginBottom: Sizer.vSize(mB) } : null),
          ...(mL ? { marginLeft: Sizer.hSize(mL) } : null),
          ...(mR ? { marginRight: Sizer.hSize(mR) } : null),
          ...(pT ? { paddingTop: Sizer.vSize(pT) } : null),
          ...(pB ? { paddingBottom: Sizer.vSize(pB) } : null),
          ...(pL ? { paddingLeft: Sizer.hSize(pL) } : null),
          ...(pR ? { paddingRight: Sizer.hSize(pR) } : null),
          ...(resolvedSpacing != null && { letterSpacing: resolvedSpacing }),
          ...(resolvedTransform && { textTransform: resolvedTransform }),
          ...(resolvedLineHeight != null && { lineHeight: resolvedLineHeight }),
          ...(flex != null && { flex }),
          ...(Platform.OS === 'android' && { includeFontPadding: false }),
        },
        style,
      ]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      onPress={onPress}
      {...props}
    >
      {children}
    </Text>
  );
};

export default React.memo(Typography);
