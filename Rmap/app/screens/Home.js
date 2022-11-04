import React, { useMemo, useCallback } from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useFonts} from 'expo-font';

function Home() {

  {/* Loading Fonts */}
  const [fontsLoaded] = useFonts({
    'Poppins-Regular' : require('./../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium' : require('./../assets/fonts/Poppins-Medium.ttf'),
  });


  {/* BottomSheet Consts */}
  const bottomSheetRef = React.useRef(null);
  const snapPoints = useMemo(() => ['13%', '40%','95%'], []);

    return (
      <SafeAreaView style={styles.container} >
        <StatusBar style="auto" />
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheet}
        >
          <View style={styles.searchContainer}>
            {/* Search Bar */}
            <View style={styles.searchBox}>
              <Text style={styles.searchText}>Search</Text>
            </View>
            {/* Profile */}
            <Image style={styles.profileImage}/>
          </View>
          <View style={styles.fullContainer}>
            <View style={styles.mainContainer}>
              {/* Class & Directory Buttons*/}
              <View style={styles.mainOptions}>
                <Pressable style = {styles.classButton}>
                  <View style = {styles.classView}>
                    <Text style={styles.pressableText}>Get me to{"\n"}class</Text>
                  </View>
                </Pressable>
                <Pressable style = {styles.directoryButton}>
                <Text style={styles.pressableText}>UCR{"\n"}Directory</Text>
                </Pressable>
              </View>
              {/* Favorites & Settings Buttons*/}
              <View style = {styles.secondOptions}>
              <Pressable style = {styles.favoriteButton}>

              </Pressable>
              <Pressable style = {styles.settingButton}>

                </Pressable>
              </View>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
      );
}
export default Home;

const styles = StyleSheet.create({
  bottomSheet:{
    backgroundColor: '#F6F7F4',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchBox: {
    height: 33,
    width: 300,
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    alignItems: 'start',
    justifyContent: 'center',
  },
  searchText: {
    color: '#C1C1C1',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#478BFF',
  },
  mainContainer: {
    width:376,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullContainer:{
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  mainOptions: {
    height:210,
    width:302,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  secondOptions:{
    height:210,
    justifyContent:'space-between',
  },
  classButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'end',
    height:210,
    width:146,
    backgroundColor: '#A6D49F',
    borderRadius: 10,
  },
  classView:{
    backgroundColor: '#111111',
    flexDirection: 'column',
    alignItems: 'end',
    width:123,
    height: 50,
  },
  directoryButton: {
    height:210,
    width:146,
    backgroundColor: '#478BFF',
    borderRadius: 10,
  },
  pressableText:{
    fontFamily : 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  favoriteButton: {
    height: 100,
    width: 64,
    borderRadius: 10,
    backgroundColor: '#FFB81C',
  },
  settingButton: {
    height: 100,
    width: 64,
    borderRadius: 10,
    backgroundColor: '#C1C1C1',
  }
});