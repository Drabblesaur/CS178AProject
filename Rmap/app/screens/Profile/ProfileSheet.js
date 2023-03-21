
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback, BottomSheetTextInput, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import { Foundation } from '@expo/vector-icons';
import ItemButton from '../../components/ItemButton';

const ProfileSheet = (props) => {
    const [userdata, setUserdata] = React.useState(null)
    const loaddata = async () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                fetch('http://192.168.4.25:4000/userdata', {
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
    
      
    return (
        <View style={styles.container}>
            <View style={styles.menu_container}>
                <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>Profile</Text>
                <TouchableWithoutFeedback onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}>
                <Feather name="x-circle" size={32} color="white" />
                </TouchableWithoutFeedback>
            </View>
            {
                userdata ?
                <View style={{width: '100%', height: '100%',flexDirection:'column',marginTop:10}}>
                <View style={styles.c1}>
                {
                    userdata.profilepic.length > 0 && userdata.profilepic != "" ?
                        <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                        :
                        <Text style={styles.txt}>No pic</Text>
                }
                <Text style={styles.txt}>{userdata.email}</Text>
                </View>
                <ItemButton title="Edit Profile" subtitle="Change your profile picture" backgroundColor="#B8D6FB" onPress={() => {props.navigation.navigate('EditProfile')}}/>
                <ItemButton title="Edit Classes" subtitle="Add Classes" backgroundColor="#E6FCE3" onPress={() => {props.navigation.navigate('EditClasses')}}/>
                <ItemButton title="Logout" subtitle="Logout of your account" backgroundColor="#FFB0B0" onPress={() => {props.navigation.navigate('WelcomeScreen');}}/>
                </View>
                :
                <ActivityIndicator size="large" color="white" />
            }
        </View>
    )
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
    menu_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: '#111111',
    },
    profilepic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10
    },
    txt: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        //backgroundColor: '#111111',
        borderRadius: 20
    },
    c1: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
  });

export default ProfileSheet;