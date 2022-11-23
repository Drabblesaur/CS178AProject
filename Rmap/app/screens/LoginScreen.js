import {View, Button,StyleSheet,Text } from "react-native";

function LoginScreen(props) {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Login Screen</Text>
        <Button title ='go to home' onPress={() => {
          props.navigation.navigate('Modals');
        }}/>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
