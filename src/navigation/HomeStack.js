import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home';

const {Navigator, Screen} = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Navigator initialRouteName="HomeStack">
      <Screen
        name="HomeStack"
        component={Home}
        options={{
          headerShown: false,
        }}></Screen>
    </Navigator>
  );
};
