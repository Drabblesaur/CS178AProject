import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback, BottomSheetTextInput,} from '@gorhom/bottom-sheet';
import ItemButton from '../components/ItemButton';
function BuildingSheet(props){

    const handleFocus = () => {
        console.log("focused search bar");
    }

    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Buildings</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <BottomSheetTextInput 
                style={styles.searchBar} 
                placeholder="Search"
                onFocus={() => {handleFocus();}}
            />
            {/* We need to place a List of Items from the DB here */}
            <ItemButton title="Bornes Hall A" subtitle="0.5 mi"/>
            <ItemButton title="Material Science & Engineering" subtitle="0.8 mi"/>
            <ItemButton title="Physics 2000" subtitle="1.2 mi"/>
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
    searchBar: {
        marginTop: 10,
        flexDirection: 'row',
        height: 33,
        width: '100%',
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
      },
});

export default BuildingSheet;