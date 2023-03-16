import * as React from 'react';
import { StyleSheet, Text, View,Keyboard} from 'react-native';
import {
    TouchableWithoutFeedback,
    BottomSheetTextInput,
    KEYBOARD_DISMISS_THRESHOLD,
  } from '@gorhom/bottom-sheet';
import Feather from '@expo/vector-icons/Feather'; 
import HomeContent from '../components/HomeContent';
import searchContent from '../components/SearchContent';


function HomeSheet(props){

    const { index } = props.route.params;
    const profile_element = <TouchableWithoutFeedback onPress={() => {props.navigation.navigate('Profile');}}><View style={styles.profile}/></TouchableWithoutFeedback>;
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
        setMenuContent(<HomeContent navigation={props.navigation}/>);
        setSideItem(profile_element);
        Keyboard.dismiss();
    }


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


