import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColors } from '../hooks/useTheme';
import MainTabs from './MainTabs';
import {
  AboutScreen,
  ApplicationDetailScreen,
  ApplicationsScreen,
  ApplyDoneScreen,
  ApplyScreen,
  ArticleScreen,
  BreedingScreen,
  CartScreen,
  CatProfileScreen,
  CheckoutScreen,
  ContactScreen,
  EditProfileScreen,
  FaqsScreen,
  FavoritesScreen,
  GalleryScreen,
  GuideScreen,
  HelpScreen,
  JourneyScreen,
  KittenDetailScreen,
  LegalScreen,
  LoginScreen,
  MessagesScreen,
  NotifSettingsScreen,
  NotificationsScreen,
  OnboardingScreen,
  OrderConfirmScreen,
  OrderDetailScreen,
  OrdersScreen,
  PasswordScreen,
  PedigreeScreen,
  ProductDetailScreen,
  RegisterScreen,
  ResetPasswordScreen,
  SearchScreen,
  SettingsScreen,
  SplashScreen,
  TestimonialsScreen,
  WelcomeScreen,
  WishlistScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const colors = useColors();
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        navigationBarColor: colors.background,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {/* Splash → onboarding → auth */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      {/* The five tabs */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* Cats */}
      <Stack.Screen name="CatProfileScreen" component={CatProfileScreen} />
      <Stack.Screen name="KittenDetailScreen" component={KittenDetailScreen} />
      <Stack.Screen name="BreedingScreen" component={BreedingScreen} />
      <Stack.Screen name="PedigreeScreen" component={PedigreeScreen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />

      {/* Shop */}
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="OrderConfirmScreen" component={OrderConfirmScreen} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />

      {/* Learn */}
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="GuideScreen" component={GuideScreen} />
      <Stack.Screen name="ApplyScreen" component={ApplyScreen} />
      <Stack.Screen name="ApplyDoneScreen" component={ApplyDoneScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />

      {/* Profile */}
      <Stack.Screen name="ApplicationsScreen" component={ApplicationsScreen} />
      <Stack.Screen name="ApplicationDetailScreen" component={ApplicationDetailScreen} />
      <Stack.Screen name="JourneyScreen" component={JourneyScreen} />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="TestimonialsScreen" component={TestimonialsScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="FaqsScreen" component={FaqsScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="NotifSettingsScreen" component={NotifSettingsScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="LegalScreen" component={LegalScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}
