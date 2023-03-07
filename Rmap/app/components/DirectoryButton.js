import * as React from 'react';
import {Text, View } from 'react-native';

function DirectoryButton (props) {
  return (
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
  )
}

export default DirectoryButton;