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
import LeaveEntry from '../Pages/Home/Dashboard/LeaveEntry';
import OutDoor from '../Pages/Home/Dashboard/OutDoor';
import LeaveBalance from '../Pages/Home/Dashboard/LeaveBalance';
import LeaveStatus from '../Pages/Home/Dashboard/LeaveStatus';

// Define the HomeStack
const HomeStackNavigator = createNativeStackNavigator();

const HomeStack = () => {
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

          const tintColor = focused ? WHITE : '#252324';

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

// Define the MainStack to include TabStack and LeaveEntry
const MainStackNavigator = createNativeStackNavigator();

const MainStack = () => {
  return (
    <MainStackNavigator.Navigator initialRouteName="Tabs">
      <MainStackNavigator.Screen
        name="Tabs"
        component={TabStack}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="LeaveEntry"
        component={LeaveEntry}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <MainStackNavigator.Screen
        name="OutDoor"
        component={OutDoor}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <MainStackNavigator.Screen
        name="LeaveBalance"
        component={LeaveBalance}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <MainStackNavigator.Screen
        name="LeaveStatus"
        component={LeaveStatus}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
    </MainStackNavigator.Navigator>
  );
};

// Define the main App component
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <MainStack />
    </NavigationContainer>
  );
}
