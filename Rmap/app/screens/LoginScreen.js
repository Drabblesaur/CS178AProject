
import {View, Button,StyleSheet,Text,TextInput } from "react-native";
import React, { useState } from 'react';




const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
  
    const registerHandler = () => {
        fetch('http://192.168.0.105:4000/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
        }).then(res => res.json()).then(
          data => {
            if (data.message)
              alert(data.message)
            else
              alert("Please try again");
          }
        ).catch(err => {
          console.log(err);
        })
       
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
        <Button title="Register" onPress={registerHandler} />
      </View>
    );
  };

  



export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
