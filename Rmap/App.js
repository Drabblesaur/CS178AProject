import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";

const BottomSheet = createBottomSheetNavigator();

import HomeScreen from './app/screens/HomeScreen';
import FirstScreen from './app/screens/FirstScreen';

export default function App() {
  return (
    <NavigationContainer>
      <BottomSheet.Navigator
        screenOptions={{ snapPoints: ['13%', '40%','95%']}}
      >
        <BottomSheet.Screen name="Home" component={HomeScreen} />
        <BottomSheet.Screen name="First" component={FirstScreen} />
      </BottomSheet.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
