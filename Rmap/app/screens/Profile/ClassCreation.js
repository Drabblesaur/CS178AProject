import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View,Keyboard,ScrollView,TextInput, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback, BottomSheetTextInput, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ItemButton from '../../components/ItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';


function ClassCreation(props){

  const [name, setName] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [userdata, setUserdata] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  const ClassHandler = (email, building) => {
      console.log(email);
      fetch('http://192.168.4.25:4000/addClasses', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          
          body: JSON.stringify({
              email, //coming from userdata.email
              building, //coming from props.route.params.building.properties.building
              name, //coming from text box
              room, //coming from text box

          })
      })
          .then(res => res.json())
          .then(async data => {
              if (data.error) {
                  alert(data.error)
              }
              else if (data.message == 'class added succesfully') {
                  console.log('userdata from class creation:', userdata);
                  var userdata1 = {...userdata, ...data};
                  
                  props.navigation.navigate('EditClasses', {userdata})
              }
          })
          .catch(err => {
              alert(err)
          })
  }
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

 
  return (
    <SafeAreaView style={{flex:1,backgroundColor: '#84BC7C',}}>
    <View style={styles.container}>
      {/* Title & Back Button*/}
      <View style={styles.menu_container}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Class Creation</Text>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); props.navigation.dispatch(CommonActions.goBack()); }}>
          <Feather name="x-circle" size={32} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white',marginVertical:20}}>{props.route.params.building.properties.building}</Text>
      <View style={styles.input_container}>
        <Text style={{ fontSize: 20, color: 'white',fontWeight:'bold' }}>class name *</Text>
        <TextInput
            style={styles.input}
            placeholder="Phil 145..."
            value={name}
            onChangeText={setName}
          />
      </View>
      <View style={styles.input_container}>
        <Text style={{ fontSize: 20, color: 'white',fontWeight:'bold' }}>room number</Text>
        <TextInput
          style={styles.input}
          placeholder="134, 245, etc..."
          value={room}
          onChangeText={setRoom}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => ClassHandler(email, props.route.params.building.properties.building)} >
        <View style={styles.button_container}>
          <Text style={{ fontSize: 20, color: 'white',fontWeight:'bold' }}>Add Class</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </SafeAreaView>
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
input_container:{
  //backgroundColor:'red',
  width:'90%',
  alignItems:'start',
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
searchBar: {
    marginTop: 10,
    flexDirection: 'row',
    height: 33,
    width: '100%',
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  button_container:{
    backgroundColor: '#478BFF',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }

});

export default ClassCreation;