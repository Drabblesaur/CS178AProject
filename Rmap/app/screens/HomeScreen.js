import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {BottomSheetBackdrop,BottomSheetBackdropProps,} from '@gorhom/bottom-sheet';

function HomeScreen({navigation}: BottomSheetScreenProps<BottomSheetParams, 'Home'>){
    return(
        <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
        title="Open sheet"
        onPress={() => {
          navigation.navigate('First');
        }}
      />
        <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  });

export default HomeScreen;