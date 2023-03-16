
import {View, Button,StyleSheet,Text,TextInput, ActivityIndicator } from "react-native";
import React, { useState } from 'react';






const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('')
    

   
  
    const registerHandler = () => {
    if (password == '' || confirmpassword == '' || email == '') {
        alert('Please enter email and password')
    }else if(email.slice(-7) != 'ucr.edu'){
        alert('Please enter an UCR email') 
    }else if(password.length < 8){
        alert('Password must be at least 8 characters long!')
    }else if (password != confirmpassword) {
        alert('Password does not match')
    }
    else {      
      fetch('http://192.168.0.28:4000/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, password: password })
      })
          .then(res => res.json()).then(
              data => {
                  if (data.error === "User not Registered") {                    
                      alert('Email already taken!');
                      console.log("FAILURE");
                      
                  }
                  else if (data.message === "User Registered Successfully") {                      
                      console.log("SUCCESS");
                      alert(data.message);
                      props.navigation.navigate('LoginScreen')
                  }
              }
          )
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmpassword}
          onChangeText={setconfirmpassword}
        />
        <Button title="Register" onPress={registerHandler} />
      </View>
    );
  };

  



export default Signup;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
