import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';


import Home from './app/screens/Home';
import Class from './app/screens/ClassScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    PoppinsRegular: require('./app/assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./app/assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemibold: require('./app/assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
        <Stack.Screen name="Class" component={Class} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
