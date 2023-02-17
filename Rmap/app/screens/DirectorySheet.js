import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

function DirectorySheet(props){
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>UCR Directory</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.button_view_1}>
                <Text style={{fontSize: 24, fontWeight: 'bold',}}>Building</Text>
            </View>
            <View style={styles.button_view_2}>
                <Text style={{fontSize: 24, fontWeight: 'bold',}}>Parking Lots</Text>
            </View>
            <View style={styles.button_view_3}>
                <Text style={{fontSize: 24, fontWeight: 'bold',}}>Food & Social</Text>
            </View>
            <View style={styles.button_view_4}>
                <Text style={{fontSize: 24, fontWeight: 'bold',}}>Bathrooms</Text>
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
    button_view_1: {
        borderRadius: 10,
        marginTop: 10,
        height: '15%',
        width: '100%',
        backgroundColor: '#A6D49F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_view_2: {
        borderRadius: 10,
        marginTop: 10,
        height: '15%',
        width: '100%',
        backgroundColor: '#C4AFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_view_3: {
        borderRadius: 10,
        marginTop: 10,
        height: '15%',
        width: '100%',
        backgroundColor: '#FFCB5C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_view_4: {
        borderRadius: 10,
        marginTop: 10,
        height: '15%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }

  });

export default DirectorySheet;