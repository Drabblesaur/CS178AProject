import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {BottomSheetBackdrop,BottomSheetBackdropProps,} from '@gorhom/bottom-sheet';

function MapViewer(props){
  const { modalOpen } = props.route.params;

  React.useEffect(() => {
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('First');
    }
  }, [props.route.params?.modalOpen]);
  
    return(
        <View style={styles.container}>
        <Text>I am a Map</Text>
        <Button title ='go to Class' onPress={() => {props.navigation.navigate('Class');}}/>
        <StatusBar/>
        <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {backgroundColor: 'lightblue', flex: 1, alignItems: 'center', justifyContent: 'center' },
  });

export default MapViewer;