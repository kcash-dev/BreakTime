import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TasksDone } from '../screens/TasksDone';
import { LoginScreen } from '../screens/LoginScreen';
import { UserDataScreen } from '../screens/UserDataScreen'
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export const ProfileNav = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {/* <Stack.Screen name="Login" component={ LoginScreen } /> */}
        <Stack.Screen name="ProfileScreen" component={ ProfileScreen } />
        <Stack.Screen name="TasksDone" component={ TasksDone } />
      </Stack.Navigator>
  );
}