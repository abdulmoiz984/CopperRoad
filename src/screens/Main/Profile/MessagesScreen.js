import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIUS } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, TextField } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { useKeyboardVisible } from '../../../hooks/useKeyboard';
import { useCustomMutation } from '../../../query';
import { sendMessage as apiSend } from '../../../api/contentService';
import { receiveReply, selectMessages, sendMessage } from '../../../redux/slices/appSlice';

/** Ported from Project/src/components/cr/profile.tsx — Messages. */
export default function MessagesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const s = useMemo(() => makeStyles(colors), [colors]);
  const keyboardUp = useKeyboardVisible();
  const scroller = useRef(null);
  const replyTimer = useRef(null);

  const [text, setText] = useState('');

  const { mutate: syncSend } = useCustomMutation({ mutationFn: apiSend });

  useEffect(() => () => clearTimeout(replyTimer.current), []);
  useEffect(() => {
    const t = setTimeout(() => scroller.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    const body = text.trim();
    dispatch(sendMessage({ text: body }));
    syncSend({ text: body });
    setText('');
    // The web appends the cattery's canned reply immediately; a short beat
    // reads more like a real conversation on a phone.
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => dispatch(receiveReply()), 900);
  };

  return (
    <View style={s.root}>
      <BackBar title="Messages" subtitle="Copper Road" />
      {/* Edge-to-edge stops Android resizing the window for the IME, so the
          composer has to be lifted on both platforms, not just iOS. */}
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scroller}
          style={styles.flex}
          contentContainerStyle={styles.thread}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(m => {
            const mine = m.from === 'me';
            return (
              <View
                key={m.id}
                style={[
                  s.bubble,
                  mine
                    ? { alignSelf: 'flex-end', backgroundColor: colors.copper }
                    : { alignSelf: 'flex-start', backgroundColor: colors.card },
                ]}
              >
                <Typography size={14} lineHeight={21} color={mine ? colors.navy : 'foreground'}>
                  {m.text}
                </Typography>
                <Typography size={10} color={mine ? colors.navy : 'mutedForeground'} mT={4} style={styles.stamp}>
                  {m.time}
                </Typography>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={[
            s.composer,
            { paddingBottom: keyboardUp ? Sizer.vSize(12) : Math.max(insets.bottom, Sizer.vSize(12)) },
          ]}
        >
          <View style={styles.flex}>
            <TextField value={text} onChangeText={setText} placeholder="Write a message" />
          </View>
          <Btn title="Send" onPress={send} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    bubble: {
      maxWidth: '80%',
      borderRadius: RADIUS.xxxl,
      paddingHorizontal: Sizer.hSize(16),
      paddingVertical: Sizer.vSize(10),
    },
    composer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Sizer.hSize(8),
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingHorizontal: Sizer.hSize(12),
      paddingTop: Sizer.vSize(12),
      backgroundColor: colors.background,
    },
  });

const styles = StyleSheet.create({
  flex: { flex: 1 },
  thread: { gap: Sizer.vSize(8), paddingHorizontal: Sizer.hSize(16), paddingBottom: Sizer.vSize(12) },
  stamp: { opacity: 0.7 },
});
