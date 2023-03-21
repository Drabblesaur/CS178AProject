import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable,Keyboard,Image,BackHandler, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableWithoutFeedback,
    BottomSheetTextInput,
    KEYBOARD_DISMISS_THRESHOLD,
  } from '@gorhom/bottom-sheet';
import Feather from '@expo/vector-icons/Feather'; 
import HomeContent from '../components/HomeContent';
import searchContent from '../components/SearchContent';


function HomeSheet(props){
    const [isLoading, setIsLoading] = React.useState(true); // add loading state
    const [userdata, setUserdata] = React.useState(null)
    const loaddata = async () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                fetch('http://192.168.6.63:4000/userdata', {
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
    },[]);
    const { index } = props.route.params;
    let profile_element = userdata && userdata.profilepic != "" && userdata.profilepic.length > 0 ? 
    (
        console.log('Rendering Image element with profile picture'),
        console.log(userdata.profilepic),
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('ProfileSheet');
          }}
        >
          
          <Image
            style={styles.profile}
            source={{ uri: userdata.profilepic }}
          />
        </TouchableWithoutFeedback>
      ) : (
        console.log('Rendering View element with default profile icon'),
        
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('ProfileSheet');
          }}
        >
          <View style={styles.profile} />
          
        </TouchableWithoutFeedback>
      );
      useEffect(() => {
        if (userdata) {
          setSideItem(profile_element);
        }
      }, [userdata]);
    const cancel_btn = <TouchableWithoutFeedback onPress={() => {handleCancel();}}><View style={styles.cancel_btn}><Feather name="x-circle" size={40} color="black" /></View></TouchableWithoutFeedback>;

    //When the search bar is focused, HomeContent should be hidden and the search results should be shown
    const [MenuContent,setMenuContent] = React.useState(<HomeContent navigation={props.navigation}/>);
    const [SideItem,setSideItem] = React.useState(profile_element);
     //MenuContent is the content of the menu, which is HomeContent by default
    const handleFocus = () => {
        console.log("focused search bar");
        setMenuContent(searchContent);
        setSideItem(cancel_btn);
        console.log(index)
    }
    const handleCancel = () => {
        console.log("cancel");
        setSideItem(profile_element);
        setMenuContent(<HomeContent navigation={props.navigation}/>);
        Keyboard.dismiss();
    }

    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate('Modals');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);


    //if(index == 1){
        //console.log("index is " + index);
        //setMenuContent(<HomeContent navigation={props.navigation}/>);
    //}

    return(
        <View style={styles.container}>
            {/* Search Container*/}
            <View style={styles.searchContainer}>
                {/* Search Bar */}
                <BottomSheetTextInput 
                style={styles.searchBar} 
                placeholder="Search"
                onFocus={() => {handleFocus();}}
                />
                {/* Side Item */}
                {SideItem}
            </View>
            {/* Menu Content */}
            
            {MenuContent}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingRight:20,
        height: '100%',
        //backgroundColor: 'lightgrey',
        },
    searchContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'grey',

    },
    searchBar: {
        flexDirection: 'row',
        height: 33,
        width: '77%',
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
      },
    profile: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#478BFF',
        marginRight: 10,
    },
    cancel_btn:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        marginRight: 10,
    }
  });

export default HomeSheet;


