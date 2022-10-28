import React, { useMemo, useRef } from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

function Home() {
  const bottomSheetRef = React.useRef(null);

  const snapPoints = useMemo(() => ['13%', '40%','95%'], []);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
        >
          <View style={styles.searchContainer}>
            {/* Search Bar */}
            <View style={styles.searchBox}>
              <Text>Search</Text>
            </View>
            {/* Profile */}
            <Image style={styles.profileImage}/>
          </View>
          <View style={styles.mainContainer}>
            {/* Class & Directory Buttons*/}
            <View style={styles.mainOptions}>
              <Pressable style = {styles.classButton}>

              </Pressable>
              <Pressable style = {styles.directoryButton}>

              </Pressable>
            </View>
            {/* Favorites & Settings Buttons*/}
            <View style = {styles.secondOptions}>
            <Pressable style = {styles.smallPressable}>

            </Pressable>
            <Pressable style = {styles.smallPressable}>

              </Pressable>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
      );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignItems: 'start',
    justifyContent: 'center',
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
    height:210,
    width:146,
    backgroundColor: '#A6D49F',
    borderRadius: 10,
  },
  directoryButton: {
    height:210,
    width:146,
    backgroundColor: '#478BFF',
    borderRadius: 10,
  },
  smallPressable: {
    height: 100,
    width: 64,
    borderRadius: 10,
    backgroundColor: '#478BFF',
  }
});