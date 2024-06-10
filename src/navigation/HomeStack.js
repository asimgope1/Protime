import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

export default HomeStack = () => {
  return <Navigator initialRouteName="Bottomnavigator"></Navigator>;
};
