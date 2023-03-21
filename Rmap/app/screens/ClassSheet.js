import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View,Keyboard, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback, BottomSheetTextInput, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ItemButton from '../components/ItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoomInto } from '../screens/MapViewer'

function ClassSheet(props){

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
        try {
          const response = await fetch(`http://192.168.0.105:4000/buildingData/${term}`);
          const data = await response.json();
          setBuildingData(data);
          if (data) {
            handleItemPress(data[0]);
          }
          console.log(data);
          
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
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Your Classes</Text>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); props.navigation.dispatch(CommonActions.goBack());}}>
                    <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <BottomSheetScrollView  contentContainerStyle={styles.contentContainer}>
            {userdata && userdata.classes.map((classObj) => (
                <ItemButton
                    key={classObj._id}
                    title={classObj.building}
                    subtitle={classObj.name}
                    text={`Room ${classObj.room}`}
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
    contentContainer: {
        backgroundColor: "white",
      },
  });

export default ClassSheet;