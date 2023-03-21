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
import Signup from './app/screens/LoginSignup/Signup';
import HomeSheet from './app/screens/HomeSheet';
import ClassSheet from './app/screens/ClassSheet';
import DirectorySheet from './app/screens/DirectorySheet';
import FavoriteSheet from './app/screens/FavoriteSheet';
import SettingsScreen from './app/screens/SettingsScreen';
import BuildingSheet from './app/screens/BuildingSheet';
import SocialSheet from './app/screens/SocialSheet';
import LotSheet from './app/screens/LotSheet';
import BathroomSheet from './app/screens/BathroomSheet';
import WelcomeScreen from './app/screens/LoginSignup/WelcomeScreen';
import LoginScreen from './app/screens/LoginSignup/LoginScreen';
import DetailedViewSheet from './app/screens/DetailedViewSheet';
import ProfileSheet from './app/screens/Profile/ProfileSheet';
import EditProfile from './app/screens/Profile/EditProfile';
import UploadProfilePicture from './app/screens/Profile/UploadProfilePicture';
import EditClasses from './app/screens/Profile/EditClasses';
import AddClasses from './app/screens/Profile/AddClasses';
import ClassCreation from './app/screens/Profile/ClassCreation';



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
        initialParams={{ modalOpen: true , floors: 0}}
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
        options={{snapPoints: ["55%","90%"],index:0, enableDismissOnClose: true, enablePanDownToClose:false, backgroundStyle:{backgroundColor: '#F0AF24'}}}
      
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
      <BottomSheet.Screen
        component={DetailedViewSheet}
        name="Details"
        options={{index:1, enableDismissOnClose: true, enablePanDownToClose:false,backgroundStyle:{backgroundColor: '#CACACA'} }}
      />
      <BottomSheet.Screen
        component={ProfileSheet}
        name="ProfileSheet"
        options={{index:1, enableDismissOnClose: true, enablePanDownToClose:false , backgroundStyle:{backgroundColor: '#478BFF'}}}
      />
    </BottomSheet.Navigator>
  );
}


export default function App() {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false,}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false,}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false,}} />
        <Stack.Screen name="Modals" component={Modals} options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false,}}/>
        <Stack.Screen name="EditClasses" component={EditClasses} options={{headerShown: false,}}/>
        <Stack.Screen name="AddClasses" component={AddClasses} options={{headerShown: false,}}/>
        <Stack.Screen name="UploadProfilePicture" component={UploadProfilePicture} options={{headerShown: false,}}/>
        <Stack.Screen name="ClassCreation" component={ClassCreation} options={{headerShown: false,}}/>
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