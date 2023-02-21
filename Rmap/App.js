import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BottomSheet = createBottomSheetNavigator();
const Stack = createNativeStackNavigator();

import MapViewer from './app/screens/MapViewer';
import LoginScreen from './app/screens/LoginScreen';
import HomeSheet from './app/screens/HomeSheet';
import ClassSheet from './app/screens/ClassSheet';
import DirectorySheet from './app/screens/DirectorySheet';


function Modals(){
  return (
    <BottomSheet.Navigator
    screenOptions={{ 
      snapPoints: ["13%","40%", "95%"], 
      backgroundStyle:{backgroundColor: '#F6F7F4'}, 
      handleIndicatorStyle:{backgroundColor: '#D9D9D9',width: 50, height: 5,}
      }}>
      <BottomSheet.Screen
        component={MapViewer}
        name="MapViewer"
        initialParams={{ modalOpen: true }}
      />
      <BottomSheet.Screen
        component={HomeSheet}
        name="Home"
        options={{enableDismissOnClose: true, enablePanDownToClose:false}}
      />
      <BottomSheet.Screen
        component={ClassSheet}
        name="Class"
        options={{index:1, enableDismissOnClose: true, enablePanDownToClose:false , backgroundStyle:{backgroundColor: '#A6D49F'}}}
      />
      <BottomSheet.Screen
        component={DirectorySheet}
        name="Directory"
        options={{index:1, enableDismissOnClose: true, enablePanDownToClose:false , backgroundStyle:{backgroundColor: '#478BFF'}}}
      />
    </BottomSheet.Navigator>
  );
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}} />
        <Stack.Screen name="Modals" component={Modals} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
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