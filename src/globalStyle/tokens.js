/**
 * Copper Road — design tokens ported 1:1 from the web app
 * (Project/src/styles.css). Two complete palettes: `:root` (light) and
 * `[data-theme="dark"]`. Nothing here is read directly by components —
 * they go through useTheme() so a toggle swaps the whole set at once.
 */

/** Brand constants that do not change between themes. */
const BRAND = {
  copper: '#BD915F',
  copperDark: '#A47B4C',
  navy: '#00264C',
  ice: '#E1EFF9',
};

export const LIGHT = {
  ...BRAND,

  primary: '#BD915F',
  primaryForeground: '#00264C',
  primaryDark: '#A47B4C',
  accent: '#BD915F',
  accentForeground: '#00264C',
  ink: '#00264C',

  surface: '#FFFFFF',
  background: '#E1EFF9',
  foreground: '#00264C',
  card: '#FFFFFF',
  cardForeground: '#00264C',
  popover: '#FFFFFF',
  popoverForeground: '#00264C',
  secondary: '#E1EFF9',
  secondaryForeground: '#00264C',
  muted: '#D3E6F4',
  mutedForeground: '#3E5670',
  dim: '#5C738A',

  destructive: '#B42318',
  destructiveForeground: '#FFFFFF',
  success: '#2F7D5A',
  // Text-only variants of the status colours. `danger` doubles as a solid
  // button fill with white text, so it can't be lightened for dark mode —
  // these are what every status *label* uses instead.
  successText: '#2F7D5A',
  dangerText: '#B42318',
  warning: '#BD915F',
  danger: '#B42318',

  border: 'rgba(0,38,76,0.10)',
  borderDark: 'rgba(0,38,76,0.16)',

  /** Badge fills — the web's tinted `bg` + `text` pair for each tone. */
  tonecopperBg: 'rgba(189,145,95,0.20)',
  tonecopperFg: '#7A5A2C',
  tonegreenBg: '#E5F6EE',
  tonegreenFg: '#1F7A4D',
  toneredBg: '#FDE8E6',
  toneredFg: '#9F2C24',
  tonemutedBg: '#E1EFF9',
  tonemutedFg: '#3E5670',

  /** A selected chip / segment. */
  chipActiveBg: '#00264C',
  chipActiveFg: '#FFFFFF',

  /** The photo placeholder the web paints behind every image. */
  photoPlaceholder: '#D5E6F2',
  /** `bg-[#00264C]/50` behind sheets and modals. */
  scrim: 'rgba(0,38,76,0.50)',
  /** `bg-white/90` on the heart button, `bg-white/15` on header icons. */
  glass: 'rgba(255,255,255,0.90)',
  glassDim: 'rgba(255,255,255,0.15)',

  shadowColor: '#00264C',
  shadowOpacity: 0.1,
};

export const DARK = {
  ...BRAND,

  primary: '#BD915F',
  primaryForeground: '#00264C',
  primaryDark: '#A47B4C',
  accent: '#BD915F',
  accentForeground: '#00264C',
  ink: '#00264C',

  surface: '#10283F',
  background: '#071525',
  foreground: '#F4F7FB',
  card: '#10283F',
  cardForeground: '#F4F7FB',
  popover: '#10283F',
  popoverForeground: '#F4F7FB',
  secondary: '#0D2136',
  secondaryForeground: '#F4F7FB',
  muted: '#16324D',
  mutedForeground: '#C5D4E4',
  dim: '#9FB0C3',

  destructive: '#B42318',
  destructiveForeground: '#FFFFFF',
  success: '#2F7D5A',
  successText: '#7FD1AA',
  dangerText: '#F0A49C',
  warning: '#BD915F',
  danger: '#B42318',

  border: 'rgba(225,239,249,0.12)',
  borderDark: 'rgba(225,239,249,0.18)',

  tonecopperBg: '#3A2E1E',
  tonecopperFg: '#E2BC8C',
  tonegreenBg: '#143528',
  tonegreenFg: '#7FD1AA',
  toneredBg: '#3A1714',
  toneredFg: '#F0A49C',
  tonemutedBg: '#0D2136',
  tonemutedFg: '#C5D4E4',

  /** Navy on a navy page reads as unselected, so dark uses copper. */
  chipActiveBg: '#BD915F',
  chipActiveFg: '#00264C',

  photoPlaceholder: '#16324D',
  scrim: 'rgba(0,0,0,0.60)',
  glass: 'rgba(16,40,63,0.90)',
  glassDim: 'rgba(255,255,255,0.12)',

  shadowColor: '#000000',
  shadowOpacity: 0.35,
};

export const PALETTES = { light: LIGHT, dark: DARK };
