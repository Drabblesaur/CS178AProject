import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 

function ClassSheet(props){
    return(
        <View style={styles.container}>
        <Text>Class Screen!</Text>
        <Button title ='Go Back' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
        <StatusBar/>
        </View>
    );
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

export default ClassSheet;