import {View, Button,StyleSheet,Text } from "react-native";

function WelcomeScreen(props) {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Get to your classes faster</Text>
        <Button title ='Sign Up' onPress={() => {
          props.navigation.navigate('Signup');
        }}/>
        <Button title ='I have an account' onPress={() => {
          props.navigation.navigate('LoginScreen');
        }}/>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});