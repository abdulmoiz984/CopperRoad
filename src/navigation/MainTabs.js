import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar, TABS } from '../components';
import { useColors } from '../hooks/useTheme';
import { CatsScreen, HomeScreen, LearnScreen, ProfileScreen, ShopScreen } from '../screens';

const Tab = createBottomTabNavigator();

const SCREENS = {
  HomeTab: HomeScreen,
  CatsTab: CatsScreen,
  ShopTab: ShopScreen,
  LearnTab: LearnScreen,
  ProfileTab: ProfileScreen,
};

export default function MainTabs() {
  const colors = useColors();
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.background } }}
      >
        {TABS.map(tab => (
          <Tab.Screen key={tab.name} name={tab.name} component={SCREENS[tab.name]} />
        ))}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
