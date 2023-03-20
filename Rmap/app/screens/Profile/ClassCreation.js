import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View,Keyboard,ScrollView,TextInput, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback, BottomSheetTextInput, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ItemButton from '../../components/ItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ClassCreation(props){

  const [name, setName] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [userdata, setUserdata] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  const ClassHandler = (email, building) => {
      console.log(email);
      fetch('http://192.168.0.105:4000/addClasses', {
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
                  await AsyncStorage.setItem('user', JSON.stringify(userdata))
                  props.navigation.navigate('EditClasses')
              }
          })
          .catch(err => {
              alert(err)
          })
  
     
  }

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        const userdata = JSON.parse(data);
        setUserdata(userdata);
        if (userdata) {
          const classes = userdata['user']['classes'];
          classes.forEach((classObj) => {
            console.log(classObj.building);
          });
          console.log('class creation userdata:', userdata.user.email);
        }
      })
      .catch(err => {
        alert(err);
      })
  }, []);

  useEffect(() => {
    if (userdata) {
      setEmail(userdata.user.email);
    }
  }, [userdata]);
  
  return (
    console.log(email),
    <View style={styles.container}>
      {/* Title & Back Button*/}
      <View style={styles.menu_container}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'green' }}>Class Creation</Text>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); props.navigation.dispatch(CommonActions.goBack()); }}>
          <Feather name="x-circle" size={32} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'black' }}>{props.route.params.building.properties.building}</Text>
      <Text style={{ fontSize: 20, color: 'black' }}>class name *</Text>
      <TextInput
          style={styles.input}
          placeholder="Phil 145..."
          value={name}
          onChangeText={setName}
        />
        <Text style={{ fontSize: 20, color: 'black' }}>room number</Text>
        <TextInput
          style={styles.input}
          placeholder="134, 245, etc..."
          value={room}
          onChangeText={setRoom}
        />
        <Button title="Add Class" onPress={() => ClassHandler(email, props.route.params.building.properties.building)} />

      
    </View>
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
  circle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default ClassCreation;