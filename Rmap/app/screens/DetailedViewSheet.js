import * as React from 'react';
import { Button, StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 

function DetailedViewSheet(props){
    var floors = []
    for (var i = 1; i <= props.route.params.floors; i++) {
        floors[i-1] = i;
    }

    return(
        <View style={styles.container}>
        <Text> {props.route.params.building} </Text>
        {
            displayRoomText(props.route.params)
        }
        {
            displayFloorButtons(floors, props)
        }
        <Button title ='Go Back' onPress={() => goBack(props)}/>
        <StatusBar/>
        </View>
    );
}

function displayRoomText(params) {
    if (params.type == "room") {
        return (<Text> Room {params.room} </Text>);
    }
    return;
}

function displayFloorButtons(floors, props) { // Lists out buttons for each floor that can be displayed
    var buttonList = floors.map(i => {return (<Button title = {`${i}`} key={`button-${i}`} onPress={() => {setMapFloorDisplay(props.route.params.building, i); /*console.log("pressed " + i);*/}}/>)});
    return buttonList;
}

function setMapFloorDisplay(buildingName, floor) { // Display building's floor on MapViewer
    // Toggle MapViewer's floor
    DeviceEventEmitter.emit("event.toggleOverlay", floor, buildingName);
    // Remove listeners
    DeviceEventEmitter.removeAllListeners("event.toggleOverlay");
}

function goBack(props) {
    resetMapViewer();
    // Go back to previous navigation screen
    props.navigation.dispatch(CommonActions.goBack());
}

function resetMapViewer() {
    // Toggle MapViewer's floor to empty set
    DeviceEventEmitter.emit("event.toggleOverlay", 0, "");
    // Remove listeners
    DeviceEventEmitter.removeAllListeners("event.toggleOverlay");
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