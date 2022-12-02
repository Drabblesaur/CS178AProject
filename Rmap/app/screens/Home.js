import React, { useMemo, useCallback } from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();
function Home({ navigation }) {

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
          handleIndicatorStyle={styles.handle}
        >
          <View style={styles.searchContainer}>
            {/* Search Bar */}
            <View style={styles.searchBox}>
              <View style ={styles.innerSearch}>
                <Icon name='search' size={20} color="#A4A4A4"></Icon>
                <Text style={styles.searchText}>Search</Text>
              </View>
            </View>
            {/* Profile */}
            <Image style={styles.profileImage}/>
          </View>
          <View style={styles.fullContainer}>
            <View style={styles.mainContainer}>
              {/* Class & Directory Buttons*/}
              <View style={styles.mainOptions}>
                <Pressable 
                  style = {styles.classButton}
                  onPress={() => navigation.navigate('Class')}
                >
                  <View style = {styles.PressableView}>
                    <View style = {styles.iconView}>
                      <Icon name='navigation-2' size={50} color="#FFFFFF"></Icon>
                    </View>
                    <Text style={styles.pressableText}>Get me to{"\n"}class</Text>
                  </View>
                </Pressable>
                <Pressable style = {styles.directoryButton}>
                <View style = {styles.PressableView}>
                  <View style = {styles.iconView}>
                  <Icon name='map' size={50} color="#FFFFFF"></Icon>
                  </View>
                    <Text style={styles.pressableText}>UCR{"\n"}Directory</Text>
                  </View>
                </Pressable>
              </View>
              {/* Favorites & Settings Buttons*/}
              <View style = {styles.secondOptions}>
              <Pressable style = {styles.favoriteButton}>
                <Icon name ='star' size={24} color="#FFFFFF" ></Icon>
              </Pressable>
              <Pressable style = {styles.settingButton}>
                <Icon name ='settings' size={24} color="#FFFFFF" ></Icon>
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
  handle:{
    backgroundColor: '#D9D9D9',
    width: 50,
    height: 5,
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
    flexDirection: 'row',
    height: 33,
    width: 300,
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchText: {
    paddingLeft: 5,
    color: '#A4A4A4',
    fontSize: 17,
    fontFamily: 'PoppinsRegular',
  },
  innerSearch:{
    flexDirection: 'row',
    paddingLeft: 10,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#478BFF',
  },
  iconView:{
    width: "100%",
    alignItems: 'center',
    padding: 25,
  },
  iconViewSmall:{
    width: "100%",
    alignItems: 'center',
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
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height:210,
    width:146,
    backgroundColor: '#A6D49F',
    borderRadius: 10,
  },
  PressableView:{
    flexDirection: 'column',
    alignItems: 'end',
    width:123,
    paddingBottom: 15,
  },
  directoryButton: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height:210,
    width:146,
    backgroundColor: '#478BFF',
    borderRadius: 10,
  },
  pressableText:{
    fontFamily : 'PoppinsMedium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 100,
    width: 64,
    borderRadius: 10,
    backgroundColor: '#FFB81C',
  },
  settingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 100,
    width: 64,
    borderRadius: 10,
    backgroundColor: '#C1C1C1',
  }
});