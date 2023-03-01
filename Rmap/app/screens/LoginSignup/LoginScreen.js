
import {View, Button,StyleSheet,Text,TextInput } from "react-native";
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


// add  2 extra button, one for sign up which takes to signup.js 

const LoginScreen = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

   
  
    const LoginHandler = () => {
      if (email == '' || password == '') {
        alert('Please enter email and password')
    }
    else {
        fetch('http://192.168.0.105:4000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(async data => {
                if (data.error) {
                    alert(data.error)
                }
                else if (data.message == 'Successfully Signed In') {
                    await AsyncStorage.setItem('user', JSON.stringify(data))
                    props.navigation.navigate('Modals', { data })
                }
            })
            .catch(err => {
                alert(err)
            })
    }
       
    }

   
    /* <Button title="Forgot Password?" onPress={} /> 
      Still need to implement the forgot password part 
    */
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={LoginHandler} />
        <Button title="Sign Up" onPress={registerHandler} /> 
      </View>
    );
  };

  



export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
