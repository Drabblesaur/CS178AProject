import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 

function DetailedViewSheet(props){
    return(
        <View style={styles.container}>
        <Text> {props.route.params.building} </Text>
        {
            displayRoom(props.route.params)
        }
        {
            displayFloorButtons(props)
        }
        <Button title ='Go Back' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
        <StatusBar/>
        </View>
    );
}

function displayRoom(params) {
    if (params.type == "room") {
        return (<Text> Room {params.room} </Text>);
    }
    return;
}

function displayFloorButtons(props) {
    var a = []
    for (var i = 1; i <= props.route.params.floors; i++) {
        a[i-1] = i;
    }

    const routes = props.navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 1];
    console.log(prevRoute);

    return a.map(i => {return (<Button title = {`${i}`} key={`button-${i}`} onPress={() => {props.navigation.setParams({floors: props.route.params.floors}, props.route.params.k);}}/>)});
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