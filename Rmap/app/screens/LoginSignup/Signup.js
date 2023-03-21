
import {View, Button,StyleSheet,Text,TextInput, TouchableOpacity,SafeAreaView, Image } from "react-native";
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
      fetch('http://192.168.4.25:4000/signup', {
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
      <SafeAreaView style={styles.safe_container}>
        <View style={styles.container}>
        <Image style = {styles.logo} source={require('../../assets/Rmap.png')}></Image>
        <Text style = {styles.signup_text}>Sign Up</Text>
        <View style ={styles.input_container}>
          <Text style = {styles.text}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="example@ucr.edu"
              placeholderTextColor="#BCBCBC"
              value={email}
              onChangeText={setEmail}
            />
        </View>
        <View style ={styles.input_container}>
        <Text style = {styles.text}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="8+ Characters"
            placeholderTextColor="#BCBCBC"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style ={styles.input_container}>
          <Text style = {styles.text}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#BCBCBC"
            secureTextEntry={true}
            value={confirmpassword}
            onChangeText={setconfirmpassword}
          />
          </View>
          <TouchableOpacity style={styles.account_container} onPress={registerHandler}>
            <View style={styles.button_text}>
              <Text style = {styles.buttonText}>Create an Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  

export default Signup;

const styles = StyleSheet.create({

  safe_container:{
    flex:1,
    backgroundColor: '#2C4EDC',
  },
  
  container:{ 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#2C4EDC',
  },
  input_container:{
    //backgroundColor:'red',
    width:'80%',
    alignItems:'flex-start',
    marginBottom:20
  },
  input:{
    fontSize: 18,
    width: '100%',
    justifyContent:'center',
    borderRadius:10,
    padding: 10,
    backgroundColor: '#E7E7E7'
  },

  signup_text:{
    color: '#FAF4EE',
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  
  text:{
    marginTop:20,
    fontSize: 20, 
    alignItems: 'center', 
    color: "#FFF",
    textAlign: 'right',
    marginBottom:10,
    fontWeight: "bold",
  },

  account_container:{
    marginTop:30,
    backgroundColor:'#478BFF',
    width:'60%',
    minHeight:60,
    justifyContent:'center',
    borderRadius:20
  },

  buttonText:{
    fontSize: 20, 
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFF",
  },

  button_text:{
    //backgroundColor :"black",
    width: "100%",
    alignItems: 'center'
  },

  logo:{
    height:46,
    width:135,
    marginTop: 35,
  },
})
