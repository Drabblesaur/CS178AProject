import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 

function DirectorySheet(props){
    return(
        <View style={styles.container}>
        <Text>Directory Screen!</Text>
        <Button title ='Go Back' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
        <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center'},
  });

export default DirectorySheet;