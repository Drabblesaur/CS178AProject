import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

function ProfileSheet(props){
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>Name</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="black" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.button_view}>
                <Text style={{fontSize: 24, fontWeight: 'bold',}}>CS 171</Text>
                <Feather name="chevron-right" size={24} color="black" />
            </View>
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
    button_view: {
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        height: '15%',
        width: '100%',
        backgroundColor: '#E6FCE3',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
  });

export default ProfileSheet;