import { Dimensions } from 'react-native';
import Sizer from '../helpers/Sizer';

export { LIGHT, DARK, PALETTES } from './tokens';

export const WINDOW = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  screenPx: 16,
};

/** The web's radius ramp — base `--radius` is 1.25rem. */
export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 24,
  xxxl: 28,
  huge: 32,
  pill: 999,
};

/**
 * Cormorant Garamond for headings (the web's `.font-display`, weight 600),
 * Inter for everything else. PostScript names verified against each TTF's
 * internal name table, so iOS and Android resolve the same strings.
 */
export const FONTS = {
  displayMedium: 'CormorantGaramond-Medium',
  displaySemiBold: 'CormorantGaramond-SemiBold',
  displayBold: 'CormorantGaramond-Bold',
  displayItalic: 'CormorantGaramond-MediumItalic',

  bodyRegular: 'Inter-Regular',
  bodyMedium: 'Inter-Medium',
  bodySemiBold: 'Inter-SemiBold',
  bodyBold: 'Inter-Bold',
};

/**
 * Type presets. `color` is a *token name* resolved against the active palette
 * at render time, not a literal — that is what lets one toggle re-colour the
 * whole app.
 */
export const TYPE = {
  // `.font-display` — letter-spacing -0.01em, line-height 1.15
  displayXl: { size: 34, lineHeight: 39, font: 'displaySemiBold', color: 'foreground', letterSpacing: -0.34 },
  displayLg: { size: 30, lineHeight: 35, font: 'displaySemiBold', color: 'foreground', letterSpacing: -0.3 },
  display: { size: 26, lineHeight: 30, font: 'displaySemiBold', color: 'foreground', letterSpacing: -0.26 },
  displayMd: { size: 24, lineHeight: 28, font: 'displaySemiBold', color: 'foreground', letterSpacing: -0.24 },
  displaySm: { size: 20, lineHeight: 23, font: 'displaySemiBold', color: 'foreground', letterSpacing: -0.2 },

  /** `text-[11px] font-semibold uppercase tracking-[0.18em]` — the Eyebrow. */
  eyebrow: { size: 11, lineHeight: 15, font: 'bodySemiBold', color: 'foreground', letterSpacing: 1.98, textTransform: 'uppercase' },
  /** `text-[13px] font-medium` — field labels. */
  label: { size: 13, lineHeight: 18, font: 'bodyMedium', color: 'foreground' },

  body: { size: 15, lineHeight: 23, font: 'bodyRegular', color: 'foreground' },
  bodyMuted: { size: 15, lineHeight: 23, font: 'bodyRegular', color: 'mutedForeground' },
  bodySm: { size: 14, lineHeight: 21, font: 'bodyRegular', color: 'mutedForeground' },
  caption: { size: 13, lineHeight: 19, font: 'bodyRegular', color: 'mutedForeground' },
  tiny: { size: 12, lineHeight: 17, font: 'bodyRegular', color: 'mutedForeground' },
  micro: { size: 11, lineHeight: 15, font: 'bodyMedium', color: 'mutedForeground' },

  /** `text-[15px] font-semibold` — the Btn label. */
  button: { size: 15, lineHeight: 20, font: 'bodySemiBold', color: 'primaryForeground' },
};

/**
 * Type scale.
 *
 * The earlier ports compressed large type here because their Sizer inflated
 * every font by ~15%. This app's Sizer maps the web's 390px design column
 * onto the device with one uniform ratio, so a size is already the web's
 * size — compressing again would render headings ~9% smaller than the design.
 * The hook stays so the whole app can be nudged from one place.
 */
export const TYPE_SCALE = 1;

export function moderateType(size) {
  return size * TYPE_SCALE;
}

/** `shadow-sm` — the quiet lift under cards and chips. */
export function softShadow(colors) {
  return {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: colors.shadowOpacity,
    shadowRadius: 8,
    elevation: 2,
  };
}

/** `shadow-lg` — the FAB and toasts. */
export function liftShadow(colors) {
  return {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: colors.shadowOpacity * 1.6,
    shadowRadius: 18,
    elevation: 8,
  };
}

export function globalStyle(colors) {
  return {
    wrap: { flex: 1, backgroundColor: colors.background },
    paddingHor: { paddingHorizontal: Sizer.hSize(SPACING.screenPx) },
    card: {
      backgroundColor: colors.card,
      borderRadius: RADIUS.xl,
      borderWidth: 1,
      borderColor: colors.border,
    },
  };
}

export const MOTION = {
  splashMs: 2200,
  riseMs: 500,
  fadeInMs: 450,
  popMs: 550,
  toastMs: 2600,
};

/**
 * `StyleSheet.absoluteFillObject` does not resolve a height against a parent
 * with a fixed height on RN 0.87 — the child grows to its content instead of
 * being pinned to `bottom: 0`. Explicit 100%/100% is used wherever a view
 * must cover its parent.
 */
export const OVERLAY = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

/** The floating tab bar's height, so screens can clear it. */
export const TABBAR_HEIGHT = 76;
