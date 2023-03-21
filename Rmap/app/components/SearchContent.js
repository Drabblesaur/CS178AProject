import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import ItemButton from './ItemButton';


function searchContent() {
  return (
    <View style={styles.test}>
        <ItemButton title="Bornes Hall A" subtitle="0.5 mi" backgroundColor="#E7E7E7"/>
        <ItemButton title="Material Science & Engineering" subtitle="0.8 mi" backgroundColor="#E7E7E7"/>
        <ItemButton title="Physics 2000" subtitle="1.2 mi" backgroundColor="#E7E7E7"/>
    </View>
  );
}
const styles = StyleSheet.create({
    test:{
        width: '100%',
        height: '100%',
        //backgroundColor: 'red',
    }
});
export default searchContent;