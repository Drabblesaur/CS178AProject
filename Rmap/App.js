import React, {useCallback} from 'react';
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
import FavoriteSheet from './app/screens/FavoriteSheet';
import ProfileSheet from './app/screens/ProfileSheet';
import SettingsScreen from './app/screens/SettingsScreen';
import BuildingSheet from './app/screens/BuildingSheet';
import SocialSheet from './app/screens/SocialSheet';
import LotSheet from './app/screens/LotSheet';
import BathroomSheet from './app/screens/BathroomSheet';



function Modals(){

  const [index, setIndex] = React.useState(0);

  const handleChange = useCallback((index) => {
    setIndex(index);
    console.log("index is " + index);
  }, []);

  return (
    <BottomSheet.Navigator
    screenOptions={{ 
      snapPoints: ["13%","45%", "100%"], 
      backgroundStyle:{backgroundColor: '#F6F7F4'}, 
      handleIndicatorStyle:{backgroundColor: '#D9D9D9',width: 50, height: 5,},
      topInset: 45,
      onChange: (index) => handleChange(index),
      }}>
      <BottomSheet.Screen
        component={MapViewer}
        name="MapViewer"
        initialParams={{ modalOpen: true }}
      />
      <BottomSheet.Screen
        component={HomeSheet}
        name="Home"
        options={{index:1,enableDismissOnClose: true, enablePanDownToClose:false}}
        //Passing in the index every time sheet is changed 
        initialParams={{ index: index }}
      />
      <BottomSheet.Screen
        component={ClassSheet}
        name="Class"
        options={{index:1, enableDismissOnClose: true, enablePanDownToClose:false , backgroundStyle:{backgroundColor: '#84BC7C'}}}
      />
      <BottomSheet.Screen
        component={DirectorySheet}
        name="Directory"
        options={{snapPoints: ["13%","55%"],index:1, enableDismissOnClose: true, enablePanDownToClose:false , backgroundStyle:{backgroundColor: '#2C4EDC'}}}
      />
      <BottomSheet.Screen
        component={FavoriteSheet}
        name="Favorite"
        options={{snapPoints: ["13%","55%"],index:1, enableDismissOnClose: true, enablePanDownToClose:false}}
      />
      <BottomSheet.Screen
        component={ProfileSheet}
        name="Profile"
        options={{snapPoints: ["55%","90%"],index:1, enableDismissOnClose: true, enablePanDownToClose:false}}
      />
      <BottomSheet.Screen
        component={BuildingSheet}
        name="Building"
        options={{snapPoints: ["55%","90%"],index:0, enableDismissOnClose: true, enablePanDownToClose:false, backgroundStyle:{backgroundColor: '#84BC7C'}}}
      
      />
      <BottomSheet.Screen
        component={SocialSheet}
        name="Social"
        options={{snapPoints: ["55%","90%"],index:0, enableDismissOnClose: true, enablePanDownToClose:false, backgroundStyle:{backgroundColor: '#E0B04A'}}}
      
      />
      <BottomSheet.Screen
        component={LotSheet}
        name="Lots"
        options={{snapPoints: ["55%","90%"],index:0, enableDismissOnClose: true, enablePanDownToClose:false, backgroundStyle:{backgroundColor: '#A286F1'}}}
      
      />
      <BottomSheet.Screen
        component={BathroomSheet}
        name="Bathrooms"
        options={{snapPoints: ["55%","90%"],index:0, enableDismissOnClose: true, enablePanDownToClose:false, backgroundStyle:{backgroundColor: '#7AA4D6'}}}
      
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
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false,}}/>
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
