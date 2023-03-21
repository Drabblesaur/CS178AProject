import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View,Keyboard, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback, BottomSheetTextInput, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ItemButton from '../components/ItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoomInto } from '../screens/MapViewer'

function FavoriteSheet(props){

    const [userdata, setUserdata] = React.useState(null)
    const [buildingData, setBuildingData] = useState([]);
    const loaddata = () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                fetch('http://192.168.0.105:4000/userdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(value).token
                    },
                    body: JSON.stringify({ email: JSON.parse(value).user.email })
                })
                    .then(res => res.json()).then(data => {
                        if (data.message == 'User Found') {
                            setUserdata(data.user)
                            
                            
                        }
                        else {
                            alert('Login Again')
                            props.navigation.navigate('LoginScreen')
                        }
                    })
                    .catch(err => {
                        props.navigation.navigate('LoginScreen')
                        console.log('value1: ', value)
                    })
            })
            .catch(err => {
                props.navigation.navigate('LoginScreen')
                console.log('value2: ', value)
            })
    }
    useEffect(() => {
        loaddata()
    }, [])

    const handleFocus = () => {
        console.log("focused search bar");
    }

    const handleSearch = async (term) => {
        console.log(term);
      
        try {
          const buildingResponse = await fetch(`http://192.168.0.105:4000/buildingData/${term}`);
          const buildingData = await buildingResponse.json();
          if (buildingData) {
            handleItemPress(buildingData[0]);
            setBuildingData(buildingData);
          }
          console.log(buildingData);
        } catch (error) {
          console.log(error);
        }
      
        try {
          const socialResponse = await fetch(`http://192.168.0.105:4000/socialData/${term}`);
          const socialData = await socialResponse.json();
          if (socialData) {
            handleItemPress(socialData[0]);
            setBuildingData(socialData);
          }
          console.log(socialData);
        } catch (error) {
          console.log(error);
        }
      
        try {
          const parkingResponse = await fetch(`http://192.168.0.105:4000/parkingData/${term}`);
          const parkingData = await parkingResponse.json();
          if (parkingData) {
            handleItemPress(parkingData[0]);
            setBuildingData(parkingData);
          }
          console.log(parkingData);
        } catch (error) {
          console.log(error);
        }
      }


    const handleItemPress = (building) => {
        //console.log(building);
        zoomInto(building);
    }

    //
    return(
        <View style={styles.container}>
            {/* Title & Back Button*/}
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Favorites</Text>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <BottomSheetScrollView  contentContainerStyle={styles.contentContainer}>
            {userdata && userdata.favorites.map((classObj) => (
                <ItemButton
                    key={classObj._id}
                    title={classObj.building}
                    subtitle='0.5 miles away'
                    onPress={() => { handleSearch(classObj.building) }}
                     />
            ))}
          
            </BottomSheetScrollView >
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
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        height: '15%',
        width: '100%',
        backgroundColor: '#E6FCE3',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer:{
        flexDirection: 'column',
        //backgroundColor: "white",
    }

  });


export default FavoriteSheet;