import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function HomeSheet(props){
    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },
  });

export default HomeSheet;