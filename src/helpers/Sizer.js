import { Dimensions } from 'react-native';

/**
 * The web build is a fixed 390px-wide phone column (`AppShell`'s
 * `max-w-[390px]`), so every number taken from it is already in a phone
 * coordinate space. Mapping that space onto the device needs ONE uniform
 * ratio — a fixed-width design scales evenly on both axes.
 *
 * react-native-size-matters was the earlier choice here, but its
 * `verticalScale` divides by a 680pt guideline height, which inflates every
 * vertical measurement by ~28% on a modern handset: the home hero rendered at
 * 0.90 of the screen width where the web draws it at 0.72. `scale` likewise
 * inflates by ~15%. Both are replaced by the single ratio below.
 */
const BASE_WIDTH = 390;

const { width, height } = Dimensions.get('window');
const shortSide = Math.min(width, height);

/** Clamped so a tablet or a very small phone stays within sane bounds. */
const RATIO = Math.min(1.2, Math.max(0.85, shortSide / BASE_WIDTH));

const round = n => Math.round(n * 100) / 100;

const hSize = size => round(size * RATIO);
const vSize = size => round(size * RATIO);
const fS = size => round(size * RATIO);

export default { fS, vSize, hSize, RATIO };
