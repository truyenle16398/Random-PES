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
  Temp,
  ListTeam
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
        initialRouteName={Screen.HOME_SCREEN}>
        <Stack.Screen name={Screen.HOME_SCREEN} component={Home} />
        <Stack.Screen name={Screen.TEMP_SCREEN} component={Temp} />
        <Stack.Screen name={Screen.LIST_TEAM_SCREEN} component={ListTeam} />
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
