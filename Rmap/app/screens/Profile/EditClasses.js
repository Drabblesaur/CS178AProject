import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View,Keyboard,ScrollView,TextInput, TouchableOpacity, ActivityIndicator,FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback, BottomSheetTextInput, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ItemButton from '../../components/ItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

function EditClasses(props){
    const [userdata, setUserdata] = React.useState(null)
    const loaddata = () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                fetch('http://192.168.4.25:4000/userdata', {
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

    const handleFocus = () => {
        console.log("focused search bar");
    }

    const handleItemPress = () => {
        
    }

  const [isFetching, setIsFetching] = useState(false);
  const handleLoadMore = () => {
    setIsFetching(true);
    console.log('BREAKING');
    AsyncStorage.getItem('user')
    .then(async (value) => {
        fetch('http://192.168.4.25:4000/userdata', {
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
                setIsFetching(false);
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

    

    return (
      <SafeAreaView style={{flex:1,backgroundColor: '#84BC7C',}}>
        <View style={styles.container}>
        {/* Title & Back Button*/}
        <View style={styles.menu_container}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Classes</Text>
          <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); props.navigation.dispatch(CommonActions.goBack()); }}>
            <Feather name="x-circle" size={32} color="white" />
          </TouchableWithoutFeedback>
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onFocus={() => { handleFocus(); }}
        />
        {/* Display search results */}
        <FlatList
          contentContainerStyle={styles.contentContainer}
          horizontal={false}
          data={userdata?.classes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
          <ItemButton
            title={item.building}
            backgroundColor='#E6FCE3'
            subtitle={item.name}
            onPress={() => handleItemPress()}
          />
          )}
          ListFooterComponent={() => (
        isFetching ?
          <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="blue" /> :
          <Button style={styles.loadMore} title="Load More" onPress={() => handleLoadMore()} />
            )}
        />
        <TouchableOpacity style={styles.circle} onPress={() => props.navigation.navigate('AddClasses')}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
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
      backgroundColor: '#84BC7C',
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
      minWidth: 340,
      flexDirection: 'column',
      //backgroundColor: "white",
    },
    circle: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#478BFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadMore: {
      backgroundColor: '#1e90ff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
    },

});

export default EditClasses;