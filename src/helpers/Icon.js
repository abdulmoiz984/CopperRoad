import React, { memo } from 'react';
// Static import — bundles Lucide.ttf (bare RN; dynamic import needs Expo)
import { Lucide } from '@react-native-vector-icons/lucide/static';

const Icon = ({ name, size, color, style, strokeWidth = 1.75 }) => (
  <Lucide name={name} size={size} color={color} style={style} strokeWidth={strokeWidth} />
);

export default memo(Icon);
