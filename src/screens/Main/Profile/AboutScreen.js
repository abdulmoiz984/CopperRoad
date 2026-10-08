import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';
import { RADIUS } from '../../../globalStyle/Theme';
import { Typography } from '../../../atomComponents';
import { BackBar, Screen } from '../../../components';
import { useColors } from '../../../hooks/useTheme';
import { IMAGES } from '../../../assets/images';

/** Ported from Project/src/components/cr/profile.tsx — AboutScreen. */
export default function AboutScreen({ navigation }) {
  const colors = useColors();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackBar title="About Us" />
      <Screen contentStyle={styles.body}>
        <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />

        <Typography size={11} font="bodySemiBold" letterSpacing={1.76} textTransform="uppercase" mT={16}>
          Founder &amp; Matchmaker of Copper Road Maine Coons
        </Typography>
        <Typography size={15} lineHeight={23} mT={12}>
          My name is Tami Krogman, and I was born and raised in South Dakota. I grew up on a small farm, where I
          developed a deep love and respect for animals—big and small. Much to my parents' dismay, I was always
          “finding” new pets to bring home.
        </Typography>
        <Typography size={15} lineHeight={23} mT={12}>
          The Maine Coon breed always fascinated me. Years later, after a long search, dodging scammers, and saving up,
          I finally found my first Maine Coon kitten—RUDI.
        </Typography>

        <Typography variant="displayLg" mT={20}>
          Raised Underfoot, Nurtured For Temperament
        </Typography>
        <Typography size={15} lineHeight={23} mT={12}>
          Our Maine Coon kittens are raised in a loving home environment where they receive constant care, play, and
          social interaction. When you adopt from Copper Road Maine Coons, you're not just welcoming a pet, you're
          welcoming a lifelong companion full of love and character.
        </Typography>

        <Pressable
          onPress={() => navigation.navigate('CatProfileScreen', { id: 'rudi' })}
          style={[styles.memorial, { backgroundColor: colors.navy }]}
        >
          <Typography size={12} color="copper" letterSpacing={1.5} textTransform="uppercase">
            In Loving Memory
          </Typography>
          <Typography variant="displayLg" color="#FFFFFF" mT={2}>
            RUDI
          </Typography>
          <Typography size={14} color="rgba(255,255,255,0.80)">
            The Heart Of Copper Road
          </Typography>
        </Pressable>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { paddingHorizontal: Sizer.hSize(20) },
  logo: { width: Sizer.hSize(140), height: Sizer.vSize(80) },
  memorial: { borderRadius: RADIUS.xxxl, padding: Sizer.hSize(16), marginTop: Sizer.vSize(20) },
});
