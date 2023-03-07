
import {View, Button,StyleSheet,Text,TextInput } from "react-native";
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';




const LoginScreen = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

   
  
    const LoginHandler = () => {
      if (email == '' || password == '') {
        alert('Please enter email and password')
    }
    else {
        fetch('http://10.13.134.253:4000/signin', {
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
      </View>
    );
  };

  



export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
