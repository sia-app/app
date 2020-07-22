import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import MenuScreen from '../screens/MenuScreen';
import TipsScreen from '../screens/TipScreen';
import ImmunityScreen from '../screens/ImmunityScreen';
import PreventiveScreen from '../screens/PreventiveScreen';
import SettingsScreen from '../screens/SettingsScreen';
import i18n from 'i18n-js';


const Stack = createStackNavigator();


export default function MenuStack() {

  
  return (
      <Stack.Navigator initialRouteName="मेन्यू" screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFC',
          borderColor: '#FFFFFC',
          elevation: 0,
          borderWidth: 0,
        },
        headerTitleAlign: 'left',
        headerTitleContainerStyle: {
          paddingLeft:0,
        },
        headerMode: 'screen',
        headerTruncatedBackTitle: i18n.t('menuBack'),
        }} >
        <Stack.Screen name="मेन्यू" options={{headerTitleStyle:{fontSize:40,paddingLeft:15}, title: i18n.t('menu')}} component={MenuScreen} />
        <Stack.Screen name="क्या करें क्या न करें" options={{headerTitleStyle:{fontSize:30}, title: i18n.t('menu1')}} component={TipsScreen} />
        <Stack.Screen name="सेहत की रक्षा के उपाय" options={{headerTitleStyle:{fontSize:20}, title: i18n.t('menu2')}} component={ImmunityScreen} />
        <Stack.Screen name="निवारक उपाय" options={{headerTitleStyle:{fontSize:30}, title: i18n.t('menu3')}} component={PreventiveScreen} />
      </Stack.Navigator>
  );
}