import * as React from 'react';
import { Button, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import Feather from '@expo/vector-icons/Feather'; 

function ItemButton (props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={
            {
                paddingLeft:20,
                paddingRight:20,
                borderRadius: 10,
                marginTop: 10,
                flexDirection: 'row',
                height: 80,
                backgroundColor: props.backgroundColor,
                alignItems: 'center',
                justifyContent: 'space-between',
            }
        }>
            <View style={styles.text_items}>
                <Text style={{fontSize: 24, fontWeight: 'bold',}}>{props.title}</Text>
                <Text style={{fontSize: 13}}>{props.subtitle}</Text>
            </View>
            <Feather name="chevron-right" size={32} color="black" />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    text_items: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});

export default ItemButton;