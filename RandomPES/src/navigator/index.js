import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Screen } from '../constants';
const Stack = createStackNavigator();
import {
  Home,
  Wheel,
  ListTeam,
  AddNew,
  SplashScr
} from "../modules";

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName={Screen.SPLASH_SCREEN}>
        <Stack.Screen name={Screen.SPLASH_SCREEN} component={SplashScr} />
        <Stack.Screen name={Screen.HOME_SCREEN} component={Home} />
        <Stack.Screen name={Screen.WHEEL_SCREEN} component={Wheel} />
        <Stack.Screen name={Screen.LIST_TEAM_SCREEN} component={ListTeam} />
        <Stack.Screen name={Screen.ADD_NEW_SCREEN} component={AddNew} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const RootApp = (props) => {
  return (
    <Root {...props} />
  );
};

export default RootApp;
