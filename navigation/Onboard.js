import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import Onboarding from '../screens/Onboarding';
import SignUpScreen from '../screens/SignUpScreen';
import langScreen from '../screens/langScreen';



const Stack = createStackNavigator();

export default function Onboard() {
  return (
      <Stack.Navigator initialRouteName="Lang" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Sign Up!" component={SignUpScreen} />
        <Stack.Screen name="Lang" component={langScreen} />
      </Stack.Navigator>
  );
}