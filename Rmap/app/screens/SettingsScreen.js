import * as React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

function SettingsScreen(props){
    return(
        <View style={styles.container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Settings</Text>
                <Button title ='go to home' onPress={() => {
          props.navigation.navigate('Modals');
        }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },
});

export default SettingsScreen;
