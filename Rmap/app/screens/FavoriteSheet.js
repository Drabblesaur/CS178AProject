import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import BuildingItem from '../components/BuildingItem';

function FavoriteSheet(props){
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>Favorites</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="black" />
                </TouchableWithoutFeedback>
            </View>
            <BuildingItem building={{name: 'Bourns Hall', address: '900 University Ave, Riverside, CA 92521'}}/>
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

export default FavoriteSheet;