import * as React from 'react';
import {Text, View } from 'react-native';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

function DirectoryButton (props) {
  return (
    <TouchableWithoutFeedback onPress={() => {props.navigation.navigate(props.location);}}>
    <View style={{     
        backgroundColor: props.color,   
        borderRadius: 10,
        marginTop: 10,
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color:'white'}}>{props.title}</Text>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default DirectoryButton;