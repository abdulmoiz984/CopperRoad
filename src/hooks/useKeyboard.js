import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * Whether the soft keyboard is on screen.
 *
 * Used to collapse the home-indicator / navigation-bar inset under a docked
 * composer: that gap belongs to the system bar, and while the keyboard covers
 * it the padding only reads as a stray band of empty space.
 *
 * iOS reports `keyboardWillShow` ahead of the animation, so the layout moves
 * with the keyboard; Android only has the `Did` events.
 */
export function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvent, () => setVisible(true));
    const hide = Keyboard.addListener(hideEvent, () => setVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return visible;
}

export default useKeyboardVisible;
