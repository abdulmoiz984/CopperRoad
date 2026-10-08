import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RADIUS, softShadow } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { BackBar, Btn, Screen, Stars } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { selectReviews } from '../../../redux/slices/appSlice';
import { toast } from '../../../utils';

/** Ported from Project/src/components/cr/profile.tsx — TestimonialsScreen. */
export default function TestimonialsScreen({ navigation }) {
  const colors = useColors();
  const reviews = useSelector(selectReviews);
  const s = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={s.root}>
      <BackBar title="Testimonials" />
      <Screen contentStyle={styles.body}>
        <View style={styles.stack}>
          {reviews.map(r => (
            <View key={r.id} style={s.card}>
              <Stars value={r.stars} />
              <Typography size={14} lineHeight={21} mT={8}>
                “{r.quote}”
              </Typography>
              <Typography size={14} font="bodySemiBold" mT={8}>
                {r.name} – {r.location}
              </Typography>
            </View>
          ))}
          <Btn
            full
            title="Write a Review"
            onPress={() => {
              navigation.navigate('MainTabs', { screen: 'HomeTab' });
              toast('The review form is on Home');
            }}
          />
        </View>
      </Screen>
    </View>
  );
}

const makeStyles = colors =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    card: {
      borderRadius: RADIUS.xxxl,
      backgroundColor: colors.card,
      padding: Sizer.hSize(16),
      ...softShadow(colors),
    },
  });

const styles = StyleSheet.create({
  body: { paddingHorizontal: Sizer.hSize(16) },
  stack: { gap: Sizer.vSize(12) },
});
