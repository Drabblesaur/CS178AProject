import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import DirectoryButton from '../components/DirectoryButton';

function DirectorySheet(props){
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>UCR Directory</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <DirectoryButton title="Buildings" color="#84BC7C" location='Building' navigation={props.navigation}/>
            <DirectoryButton title="Parking Lots" color="#A286F1" location='Lots' navigation={props.navigation}/>
            <DirectoryButton title="Food & Social" color="#F0AF24" location='Social' navigation={props.navigation} />
            <DirectoryButton title="Bathrooms" color="#7AA4D6" location='Bathrooms' navigation={props.navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingRight:20,
        //backgroundColor: 'lightgrey',
        },
    menu_container:{ 
        flexDirection: 'row',
        // backgroundColor: 'white',
        width: '100%',
        justifyContent: 'space-between',
    },
  });

export default DirectorySheet;