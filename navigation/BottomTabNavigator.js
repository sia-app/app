import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import 'react-native-gesture-handler';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MenuStackNavigator from '../navigation/MenuStackNavigator';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Menu';



export default function BottomTabNavigator() {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html  
  
  return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: '#fc7930',
        showLabel: false,
        style: {
          backgroundColor:'#FFFFFF',
        },
      }}
      > 
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Get Started',
            tabBarIcon: ({ focused, color}) => <TabBarIcon focused={focused} color={color} name="home" />,
          }}
        />
        <BottomTab.Screen
          name="Links"
          component={LinksScreen}
          options={{
            title: 'About Us!',
            tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="info" />,
          }}
        />
        <BottomTab.Screen
          name="Menu"
          component={MenuStackNavigator}
          options={{
            title: 'Menu',
            tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="menu" />,
          }}
        />
        <BottomTab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            title: 'Notifications',
            tabBarIcon: ({ focused, color}) => <TabBarIcon focused={focused} color={color} name="bell" />,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="settings" />,
          }}
        />
      </BottomTab.Navigator>
  );
}

