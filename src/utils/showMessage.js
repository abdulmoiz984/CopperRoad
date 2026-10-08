import { showMessage as flashMessage } from 'react-native-flash-message';
import { LIGHT } from '../globalStyle/tokens';

/**
 * The web's `Toasts` — a navy pill with white text, floated at the top.
 * Flash messages render outside the React tree so they can't read the theme
 * context; navy-on-white reads correctly in both themes, which is why the
 * colours are taken from the brand constants rather than the active palette.
 *
 * The top offset is set once on the `<FlashMessage>` in App.js, from the real
 * safe-area inset — not here, since `StatusBar.currentHeight` is Android-only.
 */
export function showMessage({ message = '', description = '', type = 'default', bgColor = '' }) {
  flashMessage({
    message,
    description,
    type,
    backgroundColor: bgColor || (type === 'danger' ? LIGHT.danger : LIGHT.navy),
    color: '#FFFFFF',
    duration: 2600,
    floating: true,
  });
}

/** The web calls this `toast(title)`. */
export const toast = message => showMessage({ message });

export default showMessage;
