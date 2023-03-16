
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Foundation } from '@expo/vector-icons';

const ProfileSheet = (props) => {
    const [userdata, setUserdata] = React.useState(null)
    const loaddata = async () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                fetch('http://192.168.6.175:4000/userdata', {
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
    
    
    console.log('userdata ', userdata)
    
    return (
        <View style={styles.container}>
            <StatusBar />
            {
                userdata ?
                    <ScrollView>
                         <View style={styles.c1}>
                            {
                                userdata.profilepic.length > 0 ?
                                    <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                                    :
                                    <Text style={styles.txt}>No pic</Text>
                            }
                            

                        </View>
                        <View style={styles.container}>
                            <Text style={styles.txt}>{userdata.email}</Text>
                            <Button title ='User Name' onPress={() => {props.navigation.navigate('EditProfile');}}/>
                            <Button title ='Edit Classes' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
                            <Button title ='Logout' onPress={() => {props.navigation.navigate('WelcomeScreen');}}/>
                            <Button title ='Go Back' onPress={() => {props.navigation.dispatch(CommonActions.goBack());}}/>
                        </View>
                    </ScrollView>
                    :
                    <ActivityIndicator size="large" color="white" />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center'},
    profilepic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10
    },
    txt: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#111111',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    c1: {
        width: '100%',
        alignItems: 'center',
    },
  });

export default ProfileSheet;