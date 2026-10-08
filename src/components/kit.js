import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Modal as RNModal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOTION, OVERLAY, RADIUS, SPACING, TABBAR_HEIGHT, liftShadow, softShadow } from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';
import Icon from '../helpers/Icon';
import { Typography } from '../atomComponents';
import { useColors } from '../hooks/useTheme';

/* ------------------------------------------------------------------ motion */

/** The web's `.rise` — fade up on mount. */
export function Rise({ children, delay = 0, style }) {
  const v = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(v, {
      toValue: 1,
      duration: MOTION.riseMs,
      delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [v, delay]);
  return (
    <Animated.View
      style={[
        { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

/** The web's `.pop` — scale in, used by the confirm modal. */
export function Pop({ children, style }) {
  const v = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(v, {
      toValue: 1,
      duration: MOTION.popMs,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [v]);
  return (
    <Animated.View
      style={[
        { opacity: v, transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

/* ------------------------------------------------------------------ layout */

/**
 * Standard scrolling body. `tabPad` clears the floating bottom nav, which on
 * the web is a fixed 76px bar the content sits above.
 */
export function Screen({ children, padded = true, tabPad = false, topInset = false, contentStyle, ...props }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.flex}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // Insets the content when the keyboard opens so a focused field near the
      // bottom of a long form stays reachable. iOS-only prop; Android gets the
      // same behaviour from `windowSoftInputMode="adjustResize"`.
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={[
        padded && { paddingHorizontal: Sizer.hSize(SPACING.screenPx) },
        topInset && { paddingTop: Math.max(insets.top, Sizer.vSize(12)) },
        { paddingBottom: Sizer.vSize(tabPad ? TABBAR_HEIGHT + 24 : 28) + insets.bottom },
        contentStyle,
      ]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

/** `mx-auto my-1 h-px w-12 bg-[#BD915F]` */
export function Divider({ style }) {
  const colors = useColors();
  return <View style={[styles.divider, { backgroundColor: colors.copper }, style]} />;
}

/* ------------------------------------------------------------------ display */

/** `text-[11px] font-semibold uppercase tracking-[0.18em]` */
export function Eyebrow({ children, light, style }) {
  return (
    <Typography variant="eyebrow" color={light ? 'copper' : 'foreground'} style={style}>
      {children}
    </Typography>
  );
}

/**
 * An image with the web's `bg-[#d5e6f2]` placeholder behind it and a paw
 * fallback when the file is missing.
 */
export function Photo({ source, style, imageStyle, resizeMode = 'cover', radius }) {
  const colors = useColors();
  const [failed, setFailed] = useState(false);
  return (
    <View
      style={[
        styles.photo,
        { backgroundColor: colors.photoPlaceholder },
        radius != null && { borderRadius: radius },
        style,
      ]}
    >
      {failed ? (
        <View style={styles.photoFallback}>
          <Icon name="paw-print" size={Sizer.fS(28)} color={colors.mutedForeground} />
        </View>
      ) : (
        <Image
          source={source}
          onError={() => setFailed(true)}
          resizeMode={resizeMode}
          style={[OVERLAY, imageStyle]}
        />
      )}
    </View>
  );
}

export function Badge({ children, tone = 'copper', style }) {
  const colors = useColors();
  const map = {
    copper: { bg: colors.tonecopperBg, fg: colors.tonecopperFg },
    navy: { bg: colors.navy, fg: '#FFFFFF' },
    green: { bg: colors.tonegreenBg, fg: colors.tonegreenFg },
    red: { bg: colors.toneredBg, fg: colors.toneredFg },
    muted: { bg: colors.tonemutedBg, fg: colors.tonemutedFg },
  }[tone];
  return (
    <View style={[styles.badge, { backgroundColor: map.bg }, style]}>
      <Typography size={11} font="bodySemiBold" color={map.fg}>
        {children}
      </Typography>
    </View>
  );
}

/** Ported verbatim from the web's `statusTone`. */
export function statusTone(status) {
  if (status === 'Available' || status === 'Delivered' || status === 'Approved' || status === 'Born') return 'green';
  if (
    status === 'Reserved' ||
    status === 'Expecting' ||
    status === 'Shipped' ||
    status === 'Under Review' ||
    status === 'Processing'
  )
    return 'copper';
  if (status === 'Sold' || status === 'Sold Out') return 'red';
  if (status === 'Planned' || status === 'Waitlisted' || status === 'Submitted') return 'navy';
  return 'muted';
}

/** The web draws stars as text glyphs in copper. */
export function Stars({ value = 0, size = 14 }) {
  const colors = useColors();
  // The Lucide glyph is stroke-only, so a "filled" star is impossible in the
  // icon font. The web just prints the ★ character, so do the same.
  return (
    <Text style={[styles.stars, { fontSize: Sizer.fS(size), color: colors.copper }]}>
      {'\u2605'.repeat(Math.max(0, Math.min(5, value)))}
      <Text style={{ color: `${colors.copper}4D` }}>
        {'\u2605'.repeat(5 - Math.max(0, Math.min(5, value)))}
      </Text>
    </Text>
  );
}

export function StarPicker({ value = 0, onChange }) {
  const colors = useColors();
  return (
    <View style={styles.starPicker}>
      {[1, 2, 3, 4, 5].map(n => (
        <Pressable key={n} onPress={() => onChange?.(n)} hitSlop={4} style={styles.starHit}>
          <Text style={[styles.stars, { fontSize: Sizer.fS(26), color: colors.copper }]}>
            {n <= value ? '\u2605' : '\u2606'}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function Empty({ title, body, action }) {
  const colors = useColors();
  return (
    <View style={styles.empty}>
      <View style={[styles.emptyMark, { backgroundColor: colors.card }, softShadow(colors)]}>
        <Icon name="paw-print" size={Sizer.fS(32)} color={colors.copper} />
      </View>
      <Typography variant="displayLg" textAlign="center" mT={16}>
        {title}
      </Typography>
      {body ? (
        <Typography variant="bodySm" textAlign="center" lineHeight={21} mT={8}>
          {body}
        </Typography>
      ) : null}
      {action ? <View style={styles.emptyAction}>{action}</View> : null}
    </View>
  );
}

/* ----------------------------------------------------------------- controls */

/** `h-12 rounded-2xl px-5 text-[15px] font-semibold`, five variants. */
export function Btn({ title, children, onPress, variant = 'primary', full, disabled, loading, icon, style, textStyle }) {
  const colors = useColors();
  const V = {
    primary: { bg: colors.copper, fg: colors.navy, border: 'transparent' },
    outline: { bg: 'transparent', fg: colors.foreground, border: colors.borderDark },
    navy: { bg: colors.navy, fg: '#FFFFFF', border: 'transparent' },
    ghost: { bg: 'transparent', fg: colors.foreground, border: 'transparent' },
    light: { bg: 'rgba(255,255,255,0.10)', fg: '#FFFFFF', border: 'rgba(255,255,255,0.70)' },
    danger: { bg: colors.danger, fg: '#FFFFFF', border: 'transparent' },
  }[variant];

  const off = disabled || loading;
  const label = title ?? (typeof children === 'string' ? children : null);

  return (
    <Pressable
      onPress={off ? undefined : onPress}
      disabled={off}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: V.bg,
          borderColor: V.border,
          borderWidth: V.border === 'transparent' ? 0 : 1,
          opacity: pressed ? 0.85 : off ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          alignSelf: full ? 'stretch' : 'flex-start',
        },
        variant === 'primary' && softShadow(colors),
        style,
      ]}
    >
      <View style={styles.btnInner}>
        {icon}
        {label ? (
          <Typography size={15} font="bodySemiBold" color={V.fg} textAlign="center" style={textStyle}>
            {label}
          </Typography>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
}

/** `h-9 rounded-full px-3.5 text-[13px] font-medium` */
export function Chip({ active, children, onPress, style }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: active ? colors.chipActiveBg : colors.card },
        !active && softShadow(colors),
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
        style,
      ]}
    >
      <Typography size={13} font="bodyMedium" color={active ? colors.chipActiveFg : colors.foreground}>
        {children}
      </Typography>
    </Pressable>
  );
}

export function Field({ label, error, children, style }) {
  const colors = useColors();
  return (
    <View style={[styles.field, style]}>
      {label ? (
        <Typography variant="label" mB={6}>
          {label}
        </Typography>
      ) : null}
      {children}
      {error ? (
        <Typography size={12} color={colors.dangerText} mT={4}>
          {error}
        </Typography>
      ) : null}
    </View>
  );
}

/**
 * `h-12 rounded-2xl border bg-white px-4 text-[15px]`, copper border on focus.
 * `multiline` gives the web's `Area`.
 */
export function TextField({
  value,
  onChangeText,
  placeholder,
  icon,
  rightSlot,
  multiline,
  rows = 4,
  style,
  inputStyle,
  ...props
}) {
  const colors = useColors();
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[
        styles.input,
        {
          borderColor: focused ? colors.copper : colors.borderDark,
          backgroundColor: colors.card,
        },
        focused && { borderWidth: 2, paddingHorizontal: Sizer.hSize(15) },
        multiline && { minHeight: Sizer.vSize(28 * rows), alignItems: 'flex-start' },
        style,
      ]}
    >
      {icon ? (
        <Icon name={icon} size={Sizer.fS(18)} color={colors.copper} style={styles.inputIcon} />
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.dim}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={multiline}
        allowFontScaling={false}
        style={[
          styles.inputText,
          { color: colors.foreground },
          multiline && { textAlignVertical: 'top', minHeight: Sizer.vSize(28 * rows) },
          inputStyle,
        ]}
        {...props}
      />
      {rightSlot}
    </View>
  );
}

export function PasswordField(props) {
  const colors = useColors();
  const [show, setShow] = useState(false);
  return (
    <TextField
      {...props}
      secureTextEntry={!show}
      autoCapitalize="none"
      autoCorrect={false}
      rightSlot={
        <Pressable onPress={() => setShow(v => !v)} hitSlop={10} style={styles.eye}>
          <Icon name={show ? 'eye-off' : 'eye'} size={Sizer.fS(18)} color={colors.dim} />
        </Pressable>
      }
    />
  );
}

/** The web renders a native `<select>`; on a phone that is a sheet of options. */
export function SelectField({ value, options = [], onChange, placeholder = 'Select' }) {
  const colors = useColors();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.input, { borderColor: colors.borderDark, backgroundColor: colors.card }]}
      >
        <Typography size={15} flex={1} color={value ? 'foreground' : 'dim'} numberOfLines={1}>
          {value || placeholder}
        </Typography>
        <Icon name="chevron-down" size={Sizer.fS(18)} color={colors.dim} />
      </Pressable>

      <RNModal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={[styles.backdrop, { backgroundColor: colors.scrim }]} onPress={() => setOpen(false)}>
          <Pressable style={[styles.menu, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <FlatList
              data={options}
              keyExtractor={o => String(o)}
              renderItem={({ item }) => {
                const active = item === value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange?.(item);
                      setOpen(false);
                    }}
                    style={[styles.menuItem, active && { backgroundColor: colors.secondary }]}
                  >
                    <Typography size={15} flex={1}>
                      {item}
                    </Typography>
                    {active ? <Icon name="check" size={Sizer.fS(16)} color={colors.copper} /> : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </RNModal>
    </>
  );
}

/** `h-11 w-11 rounded-full bg-white/90` with a copper fill when on. */
export function HeartBtn({ on, onPress, style }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.heart,
        { backgroundColor: colors.glass, opacity: pressed ? 0.8 : 1 },
        softShadow(colors),
        style,
      ]}
    >
      <Icon
        name="heart"
        size={Sizer.fS(18)}
        color={on ? colors.copper : colors.foreground}
        strokeWidth={on ? 0.5 : 1.75}
      />
    </Pressable>
  );
}

/** `h-11 w-11 rounded-2xl bg-white/15` — the navy header's round-rect buttons. */
export function IconBtn({ name, onPress, badge, style }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.iconBtn, { backgroundColor: colors.glassDim, opacity: pressed ? 0.7 : 1 }, style]}
    >
      <Icon name={name} size={Sizer.fS(18)} color="#FFFFFF" />
      {badge ? (
        <View style={[styles.iconBadge, { backgroundColor: colors.copper }]}>
          <Typography size={10} font="bodyBold" color={colors.navy}>
            {badge}
          </Typography>
        </View>
      ) : null}
    </Pressable>
  );
}

/* ----------------------------------------------------------------- overlays */

/** The web's bottom `Sheet` — grabber, title, Done. */
export function Sheet({ open, title, onClose, children }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <RNModal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={[styles.sheetBackdrop, { backgroundColor: colors.scrim }]} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            { backgroundColor: colors.card, paddingBottom: Math.max(insets.bottom, Sizer.vSize(28)) },
          ]}
        >
          <View style={[styles.grabber, { backgroundColor: `${colors.copper}80` }]} />
          <View style={styles.sheetHead}>
            <Typography variant="displayMd" flex={1}>
              {title}
            </Typography>
            <Pressable onPress={onClose} hitSlop={8} style={styles.sheetDone}>
              <Typography size={14} font="bodySemiBold" color="copper">
                Done
              </Typography>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

/** The web's confirm `Modal` — Cancel plus one action. */
export function Modal({ open, title, body, confirm, onConfirm, onClose, danger }) {
  const colors = useColors();
  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.modalBackdrop, { backgroundColor: colors.scrim }]} onPress={onClose}>
        <Pop style={styles.modalWrap}>
          <Pressable style={[styles.modal, { backgroundColor: colors.card }, liftShadow(colors)]}>
            <Typography variant="displayMd">{title}</Typography>
            <Typography variant="bodySm" lineHeight={21} mT={8}>
              {body}
            </Typography>
            <View style={styles.modalActions}>
              <View style={styles.flex}>
                <Btn full variant="outline" title="Cancel" onPress={onClose} />
              </View>
              <View style={styles.flex}>
                <Btn full variant={danger ? 'navy' : 'primary'} title={confirm} onPress={onConfirm} />
              </View>
            </View>
          </Pressable>
        </Pop>
      </Pressable>
    </RNModal>
  );
}

/* ------------------------------------------------------------------- styles */

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  divider: { height: 1, width: Sizer.hSize(48), alignSelf: 'center', marginVertical: Sizer.vSize(4) },

  photo: { overflow: 'hidden' },
  photoFallback: { ...OVERLAY, alignItems: 'center', justifyContent: 'center' },

  badge: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.pill,
    paddingHorizontal: Sizer.hSize(10),
    paddingVertical: Sizer.vSize(4),
  },

  stars: { letterSpacing: Sizer.hSize(1), includeFontPadding: false },
  starPicker: { flexDirection: 'row', gap: Sizer.hSize(4) },
  starHit: { width: Sizer.hSize(44), height: Sizer.hSize(44), alignItems: 'center', justifyContent: 'center' },

  empty: { alignItems: 'center', paddingHorizontal: Sizer.hSize(32), paddingVertical: Sizer.vSize(64) },
  emptyMark: {
    width: Sizer.hSize(80),
    height: Sizer.hSize(80),
    borderRadius: Sizer.hSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyAction: { marginTop: Sizer.vSize(20), width: '100%' },

  btn: {
    minHeight: Sizer.vSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    paddingHorizontal: Sizer.hSize(20),
  },
  btnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Sizer.hSize(8) },

  chip: {
    height: Sizer.vSize(36),
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: Sizer.hSize(14),
  },

  field: { marginBottom: Sizer.vSize(14) },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Sizer.vSize(48),
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: Sizer.hSize(16),
  },
  inputIcon: { marginRight: Sizer.hSize(8) },
  inputText: {
    flex: 1,
    fontSize: Sizer.fS(15),
    fontFamily: 'Inter-Regular',
    paddingVertical: Sizer.vSize(12),
    padding: 0,
  },
  eye: { paddingLeft: Sizer.hSize(8) },

  heart: {
    width: Sizer.hSize(44),
    height: Sizer.hSize(44),
    borderRadius: Sizer.hSize(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    width: Sizer.hSize(44),
    height: Sizer.hSize(44),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    position: 'absolute',
    right: -Sizer.hSize(4),
    top: -Sizer.vSize(4),
    minWidth: Sizer.hSize(20),
    height: Sizer.hSize(20),
    borderRadius: Sizer.hSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizer.hSize(4),
  },

  backdrop: { flex: 1, justifyContent: 'center' },
  menu: {
    maxHeight: '60%',
    marginHorizontal: Sizer.hSize(24),
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizer.hSize(12),
    minHeight: Sizer.vSize(48),
    paddingHorizontal: Sizer.hSize(16),
  },

  sheetBackdrop: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    maxHeight: '85%',
    borderTopLeftRadius: RADIUS.xxxl,
    borderTopRightRadius: RADIUS.xxxl,
    paddingHorizontal: Sizer.hSize(20),
    paddingTop: Sizer.vSize(12),
  },
  grabber: {
    width: Sizer.hSize(48),
    height: Sizer.vSize(6),
    borderRadius: RADIUS.pill,
    alignSelf: 'center',
    marginBottom: Sizer.vSize(12),
  },
  sheetHead: { flexDirection: 'row', alignItems: 'center', marginBottom: Sizer.vSize(16) },
  sheetDone: { paddingHorizontal: Sizer.hSize(8), paddingVertical: Sizer.vSize(10) },

  modalBackdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Sizer.hSize(24) },
  modalWrap: { width: '100%' },
  modal: { width: '100%', borderRadius: RADIUS.xxxl, padding: Sizer.hSize(20) },
  modalActions: { flexDirection: 'row', gap: Sizer.hSize(8), marginTop: Sizer.vSize(20) },

  sliderHit: { height: Sizer.vSize(44), justifyContent: 'center' },
  sliderTrack: { height: Sizer.vSize(6), borderRadius: RADIUS.pill, overflow: 'hidden' },
  sliderFill: { height: '100%', borderRadius: RADIUS.pill },
  sliderKnob: {
    position: 'absolute',
    width: Sizer.hSize(22),
    height: Sizer.hSize(22),
    borderRadius: Sizer.hSize(11),
    borderWidth: 2,
    marginLeft: -Sizer.hSize(11),
  },
});

/**
 * A minimal range control for the shop's price cap — React Native has no
 * `<input type="range">`, and the project does not pull in a slider package,
 * so the track handles the touch itself.
 */
export function Slider({ value, min = 0, max = 100, onChange }) {
  const colors = useColors();
  const [width, setWidth] = useState(0);
  const pct = max === min ? 0 : (value - min) / (max - min);

  const pick = x => {
    if (!width) return;
    const ratio = Math.max(0, Math.min(1, x / width));
    onChange?.(Math.round(min + ratio * (max - min)));
  };

  return (
    <View
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={e => pick(e.nativeEvent.locationX)}
      onResponderMove={e => pick(e.nativeEvent.locationX)}
      style={styles.sliderHit}
    >
      <View style={[styles.sliderTrack, { backgroundColor: colors.muted }]}>
        <View style={[styles.sliderFill, { width: `${pct * 100}%`, backgroundColor: colors.copper }]} />
      </View>
      <View
        style={[
          styles.sliderKnob,
          { left: `${pct * 100}%`, backgroundColor: colors.copper, borderColor: colors.card },
        ]}
      />
    </View>
  );
}
