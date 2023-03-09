import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; 

function ItemButton (props) {
  return (
    <View style={styles.button_view}>
        <View style={styles.text_items}>
            <Text style={{fontSize: 24, fontWeight: 'bold',}}>{props.title}</Text>
            <Text style={{fontSize: 13}}>{props.subtitle}</Text>
        </View>
        <Feather name="chevron-right" size={32} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    button_view: {
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        height: '13%',
        width: '100%',
        backgroundColor: '#E6FCE3',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text_items: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});

export default ItemButton;