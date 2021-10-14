import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/screens/HomeScreen';
import { SurveyScreen } from './src/screens/SurveyScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={ HomeScreen } />
        <Stack.Screen name="Survey" component={ SurveyScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
