import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackNav } from './src/navigators/StackNav';
import { ProfileScreen } from './src/screens/ProfileScreen';

import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/utils/Colors';

import store from './src/store/store'
import { Provider } from 'react-redux'
import { ProfileNav } from './src/navigators/ProfileNav';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
        >
          <Tab.Screen name="Home" component={ StackNav } />
          <Tab.Screen name="Profile" component={ ProfileNav } />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
