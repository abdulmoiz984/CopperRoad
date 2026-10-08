import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useColors } from '../hooks/useTheme';
import Typography from './Typography';

const AppLoader = ({ label, size = 'large', fullScreen = true }) => {
  const colors = useColors();
  return (
    <View
      style={
        fullScreen
          ? { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }
          : { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 }
      }
    >
      <ActivityIndicator size={size} color={colors.primary} />
      {label ? (
        <Typography variant="caption" mT={10} textAlign="center">
          {label}
        </Typography>
      ) : null}
    </View>
  );
};

export default React.memo(AppLoader);
