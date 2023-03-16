import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditProfile(props){
    return(
        <View style={styles.container}>
        <Text>Edit Profile</Text>
        <Button title ='Change Password' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
        <Button title ='Change PFP' onPress={() => {props.navigation.navigate('UploadProfilePicture');}}/>  
        <Button title ='Go Back' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
        <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center'},
  });

export default EditProfile;