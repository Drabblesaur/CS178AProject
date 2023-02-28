import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 

function DetailedViewSheet(props){
    return(
        <View style={styles.container}>
        <Text> {props.route.params.building} </Text>
        {
            displayRoom(props.route.params)
        }
        <Button title ='Go Back' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
        <StatusBar/>
        </View>
    );
}

function displayRoom(params) {
    if (params.type == "room") {
        return (<Text> Room {params.room} </Text>);
    }
    return;
}

const styles = StyleSheet.create({
    container: { flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'lightgrey',
        },
  });

export default DetailedViewSheet;