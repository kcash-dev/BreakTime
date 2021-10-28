import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/HomeScreen';
import { SurveyScreen } from '../screens/SurveyScreen';

const Stack = createNativeStackNavigator();

export const StackNav = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="HomeScreen" component={ HomeScreen } />
        <Stack.Screen name="Survey" component={ SurveyScreen } />
      </Stack.Navigator>
  );
}