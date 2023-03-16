import * as React from 'react';
import { Button, StyleSheet, Text, View,Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import ItemButton from '../components/ItemButton';

function ClassSheet(props){
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Your Classes</Text>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            {/* We need to place a List of Items from the DB here */}
            <ItemButton title="PHIL 124" subtitle="Bornes Hall A"/>
            <ItemButton title="CS 178B" subtitle="Material Science Building"/>
            <ItemButton title="PHYS 2000" subtitle="Physics 2000"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingRight:20,
        //backgroundColor: 'lightgrey',
        },
    menu_container:{ 
        flexDirection: 'row',
        // backgroundColor: 'white',
        width: '100%',
        justifyContent: 'space-between',
    },
  });

export default ClassSheet;