import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function ClassSheet(){
    return(
        <View style={styles.container}>
        <Text>Class Screen!</Text>
        <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center'},
  });

export default ClassSheet;