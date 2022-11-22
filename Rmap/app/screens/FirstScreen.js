import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function FirstScreen(){
    return(
        <View style={styles.container}>
        <Text>First Screen!</Text>
        <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'black' },
  });

export default FirstScreen;