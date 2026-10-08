import { Share } from 'react-native';
import { toast } from './showMessage';

/** The web's `shareText` — native sheet, with a toast as the fallback. */
export async function shareText(message) {
  try {
    await Share.share({ message, title: 'Copper Road' });
  } catch {
    toast('Link copied');
  }
}

export default shareText;
