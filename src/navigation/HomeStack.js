import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Pages/Home/Home';
import {Icon} from '@rneui/themed';
import {HEIGHT, WIDTH} from '../constants/config';
import {BLACK, GRAY, RED, WHITE} from '../constants/color';
import Manager from '../Pages/Home/Manager/Manager';
import Notification from '../Pages/Home/Notification/Notification';
import Profile from '../Pages/Home/Profile/Profile';

// Define the HomeStack
const HomeStackNavigator = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home">
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

// Define the TabStack
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#b4000a',
          height: HEIGHT * 0.09,
          width: WIDTH,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'absolute',
        },

        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          let type;
          let tintColor;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Manager') {
            iconName = 'manage-accounts';
          } else if (route.name === 'Notification') {
            iconName = 'bell';
            type = 'material-community';
          } else if (route.name === 'Profile') {
            iconName = 'account';
            type = 'material-community';
          }

          tintColor = focused ? WHITE : '#252324';

          return (
            <Icon
              name={iconName}
              size={HEIGHT * 0.038}
              color={tintColor}
              type={type}
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Bold',
          fontSize: 13,
          color: 'white',
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name="Manager"
        component={Manager}
        options={{headerShown: false, title: 'Manager'}}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false, title: 'Notification'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

// Define the main App component
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <TabStack />
    </NavigationContainer>
  );
}
