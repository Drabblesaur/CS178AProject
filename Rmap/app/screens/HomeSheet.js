import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {
    TouchableWithoutFeedback,
    BottomSheetTextInput,
  } from '@gorhom/bottom-sheet';
import HomeContent from '../components/HomeContent';


function HomeSheet(props){

    const { index } = props.route.params;

    //When the search bar is focused, HomeContent should be hidden and the search results should be shown
    const [MenuContent,setMenuContent] = React.useState(<HomeContent navigation={props.navigation}/>);
     //MenuContent is the content of the menu, which is HomeContent by default
    const handleFocus = () => {
        console.log("focused search bar");
        setMenuContent(<Text>Search Results</Text>);
        console.log(index)
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
                {/* Profile */}
                <TouchableWithoutFeedback onPress={() => {props.navigation.navigate('Profile');}}>
                <View style={styles.profile}/>
                </TouchableWithoutFeedback>
                {/* Cancel Button */}
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
  });

export default HomeSheet;


