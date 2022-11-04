
import React, { useMemo, useCallback } from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();
function Class ({navigation}){

     {/* BottomSheet Consts */}
    const bottomSheetRef = React.useRef(null);
    const snapPoints = useMemo(() => ['13%', '40%','95%'], []);

    return(
        <SafeAreaView style={styles.container} >
            <StatusBar style="auto" />
            <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheet}
          handleIndicatorStyle={styles.handle}
        >
            <View style={styles.mainContainer}>
                <View style={styles.HeaderContainer}>
                    <Text style = {styles.header}>Your Classes</Text>
                    <Pressable style = {styles.exit} onPress={() => navigation.navigate('Home')}>
                        <Icon name='x-circle' size={30} color="#FFFFFF"></Icon>
                    </Pressable>
                </View>
            </View>
        </BottomSheet>
        </SafeAreaView>
    );
}
export default Class;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bottomSheet:{
        backgroundColor: '#A6D49F',
      },
      handle:{
        backgroundColor: '#D9D9D9',
        width: 50,
        height: 5,
      },
      mainContainer:{
        width:368,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: 'center',
      },
      HeaderContainer:{
        width: 368,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      header:{
        fontSize: 32,
        fontFamily : 'PoppinsSemibold',
        color: '#FFFFFF',
      },
});