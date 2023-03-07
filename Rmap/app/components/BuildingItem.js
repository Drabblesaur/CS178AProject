import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; 
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

function BuildingItem(props) {
  const { building, onBuildingClick } = props;
  return (
    <View style={styles.button_view}>
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color:'black'}}>{building.name}</Text>
        <Text style={{fontSize: 16, color:'black'}}>{building.address}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => {onBuildingClick(building);}}>
        <Feather name="chevron-right" size={32} color="black" />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  button_view: {
    paddingLeft:10,
    paddingRight:10,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    height: '15%',
    width: '100%',
    backgroundColor: '#E6FCE3',
  },
});

export default BuildingItem;