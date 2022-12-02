import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Feather from '@expo/vector-icons/Feather'; 
import {
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    BottomSheetTextInput,
  } from '@gorhom/bottom-sheet';

function HomeSheet(props){
    return(
        <View style={styles.container}>
            {/* Search Container*/}
            <View style={styles.searchContainer}>
                {/* Search Bar */}
                <BottomSheetTextInput style={styles.searchBar} placeholder="Search" />
                {/* Profile */}
                <View style={styles.profile}/>
            </View>
            {/* Menu Container */}
            <View style={styles.menuContainer}>
                {/* Main Button Container */}
                <View style={styles.mainBContainer}>
                    {/* Class Button */}
                    <View style={styles.classButton}>
                        <TouchableWithoutFeedback onPress={() => {props.navigation.navigate('Class');}}>
                            <View style={styles.classTouchable}>
                                <Text>Get me to{"\n"}Class</Text>
                                <View style={styles.classIcon}>
                                <Feather name="navigation-2" color="white" size={40} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/* Directory Button */}
                    <View style={styles.directoryButton}>
                    <TouchableWithoutFeedback onPress={() => {props.navigation.navigate('Directory');}}>
                            <View style={styles.directoryTouchable}>
                                <Text>UCR{"\n"}Directory</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {/* Side Button Container */}
                <View style={styles.secBContainer}>
                    {/* Favorite Button */}
                    <View style={styles.favoriteButton}>

                    </View>
                    {/* Settings Button */}
                    <View style={styles.settingsButton}>

                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingRight:20,
        //backgroundColor: 'lightgrey',
        },
    searchContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'grey',

    },
    searchBar: {
        flexDirection: 'row',
        height: 33,
        width: '77%',
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
      },
    profile: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#478BFF',
        marginRight: 10,
    },
    menuContainer:{
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        height: 210,
        justifyContent: 'space-between',
        //backgroundColor: 'green',
    },
    mainBContainer: {
        flexDirection: 'row',
        alignItems:'space-between',
        alignContent: 'stretch',
        flex : 4,
        //backgroundColor: 'red',
    },
    classButton:{
        flex: 1,
        //backgroundColor: 'green',
        width: '100%',
        height: 210,
        paddingRight: 5,
    },
    classTouchable:{
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
        backgroundColor: '#A6D49F',
        height: 210,
        borderRadius: 10,
        padding: 10,
    },
    classIcon:{
        alignItems:'center',
        justifyContent: 'flex-end',
        flex:1,
        width:'100%',
        paddingBottom:25,
        //backgroundColor: 'yellow',
    },
    directoryButton: {
        flex: 1,
        // backgroundColor: 'yellow',
        width: '100%',
        height: 210,
        paddingLeft: 5,
        paddingRight: 10,
      },
    directoryTouchable:{
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
        backgroundColor: '#478BFF',
        height: 210,
        borderRadius: 10,
        padding: 10,
    },
    secBContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        flex : 1,
        //backgroundColor: 'blue',
    },
    favoriteButton: {
        flex: 1,
        height: "100%",
        backgroundColor: '#FFB81C',
        marginBottom: 5,
        borderRadius: 10,
    },
    settingsButton: {
        flex: 1,
        height: "100%",
        backgroundColor: '#C1C1C1',
        marginTop: 5,
        borderRadius: 10,
    }
  });

export default HomeSheet;