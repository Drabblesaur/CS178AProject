
import {View, Button,StyleSheet,Text,TextInput, Image, TouchableOpacity,SafeAreaView  } from "react-native";
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
        fetch('http://192.168.6.63:4000/signin', {
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
                    props.navigation.navigate('Modals')
                    await AsyncStorage.setItem('user', JSON.stringify(data))
                }
            })
            .catch(err => {
                alert(err)
            })
    }
       
    }

   
  
    return (
      <SafeAreaView style={styles.safe_container}>
        <View style={styles.container}>
        <Image style = {styles.logo} source={require('../../assets/Rmap.png')}></Image>
          <Text style ={styles.welcomeText}>Welcome Back!</Text>
          <Image style = {styles.logo2} source={require('../../assets/logo2.png')}></Image>
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
          <TouchableOpacity style ={styles.signup_container} onPress={LoginHandler}>
              <View style={styles.button_text}>
                <Text style = {styles.signup_Text}>Login</Text>
              </View>
            </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  };

  



export default LoginScreen;

const styles = StyleSheet.create({
  safe_container:{
    flex:1,
    backgroundColor: '#2C4EDC',
    alignContent: 'center',
  },

  container:{ 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#2C4EDC',
  },

  signup_container:{
    marginTop:30,
    backgroundColor:'#478BFF',
    width:'70%',
    minHeight:60,
    justifyContent:'center',
    borderRadius:10
  },
  button_text:{
    //backgroundColor :"black",
    width: "100%",
    alignItems: 'center'
  },
  
  signup_Text:{
    fontSize: 20, 
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFF",
  },

  input:{
    fontSize: 18,
    width: '100%',
    justifyContent:'center',
    borderRadius:10,
    padding: 10,
    backgroundColor: '#E7E7E7'
  },
  

  text:{
    marginTop:20,
    fontSize: 20, 
    color: "#FFF",
    textAlign: 'right',
    marginBottom:10,
    fontWeight: "bold",
  },

  logo:{
    height:46,
    width:135,
    marginTop: 35,
    marginBottom: 30,
  },

  welcomeText:{
    color: '#FAF4EE',
    fontSize: 36,
    marginBottom: 30,
    fontWeight: "bold",
  },

  input_container:{
    //backgroundColor:'red',
    width:'80%',
    alignItems:'flex-start',
    marginBottom:20
  },

  logo2:{
    resizeMode: 'contain',
    width: 150,
    height: 150,

  }
});
