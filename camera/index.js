import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraPostScreen from './src/CameraPostScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CameraPost">
        <Stack.Screen name="CameraPost" component={CameraPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}