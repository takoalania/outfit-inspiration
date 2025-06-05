import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import HowItWorksScreen from '../screens/HowItWorksScreen';
// import SignInScreen from '../screens/SignInScreen';
import ResultsScreen from '../screens/ResultsScreen';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  HowItWorks: undefined;
  SignIn: undefined;
  Results: { image?: string; prompt?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['http://localhost:8081', 'https://outfit-inspiration-5mhq.vercel.app'],
  config: {
    screens: {
      Home: '',
      About: 'about',
      HowItWorks: 'how-it-works',
      SignIn: 'sign-in',
      Results: 'results',
    },
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking} theme={DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
        <Stack.Screen name="SignIn" component={HomeScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}