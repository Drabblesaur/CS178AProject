import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Button} from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import {firebase} from '../../Firebase/Config';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UploadProfilePicture = (props) => {

    const [image, setImage] = useState(null);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        console.log(result)


        if (!result.cancelled) {
            const source = { uri: result.uri };
            setImage(source);
            console.log('HELLO');
            const response = await fetch(result.uri);
            const blob = await response.blob();
            const filename = result.uri.substring(result.uri);

            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
            const url = await snapshot.ref.getDownloadURL();

            // console.log(url)
            return url
        }
        else {
            return null
        }
    }

    const handleUpload = () => {
        // pickImage()
        AsyncStorage.getItem('user')
            .then(data => {
                pickImage().then(url => {
                    fetch('http://192.168.6.175:4000/setprofilepic', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            profilepic: url
                        })
                        
                    })
                        .then(res => res.json()).then(
                            data => {
                                if (data.message === "Profile picture updated successfully") {
                                    alert('Profile picture updated successfully')
                                    props.navigation.navigate('EditProfile')
                                }
                                else if (data.error === "Invalid Credentials") {
                                    alert('Invalid Credentials') 
                                    props.navigation.navigate('LoginScreen')
                                }
                                else {
                                    alert("Please Try Again");
                                }
                            }
                        )
                        .catch(err => {
                            console.log(err)
                        })

                })
            })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={Button}>

                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
           

            </TouchableOpacity>
            <Text style={styles.txt}>Choose a profile profile</Text>
            {
                
                    <Text style={Button}
                        onPress={() => handleUpload()}
                    >
                        Upload
                    </Text>
            }

        </View>
    )
}





export default UploadProfilePicture

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center'},
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
  });