import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

function ClassSheet(props){
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Your Classes</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.button_view}>
                <View style={styles.text_items}>
                    <Text style={{fontSize: 24, fontWeight: 'bold',}}>CS 171</Text>
                    <Text style={{fontSize: 12,}}>Student Success Center</Text>
                </View>
                <Feather name="chevron-right" size={32} color="black" />
            </View>
            <View style={styles.button_view}>
                <View style={styles.text_items}>
                    <Text style={{fontSize: 24, fontWeight: 'bold',}}>CS 178B</Text>
                    <Text style={{fontSize: 12,}}>Material Science & Engineering</Text>
                </View>
                <Feather name="arrow-right-circle" size={32} color="black" />
            </View>
            <View style={styles.button_view}>
                <View style={styles.text_items}>
                    <Text style={{fontSize: 24, fontWeight: 'bold',}}>PHIL 124</Text>
                    <Text style={{fontSize: 12,}}>Bornes Hall B</Text>
                </View>
                <Feather name="chevron-right" size={32} color="black" />
            </View>
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
    button_view: {
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        height: '13%',
        width: '100%',
        backgroundColor: '#E6FCE3',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text_items: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
  });

export default ClassSheet;