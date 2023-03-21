import {View, Button,StyleSheet,Text,Image, TouchableOpacity,SafeAreaView } from "react-native";

function WelcomeScreen(props) {
    return (
      <SafeAreaView style={styles.safe_container}>
          <View style={styles.container}>
          <Image style = {styles.logo} source={require('../../assets/Rmap.png')}></Image>
          <Text style={styles.text}>Get to your{"\n"} classes faster</Text>
          <Image source={require('../../assets/main_1.png')}></Image>
          <TouchableOpacity style ={styles.signup_container} onPress={() => {props.navigation.navigate('Signup')}}>
            <View style={styles.button_text}>
              <Text style = {styles.signup_Text}>Sign up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.account_container} onPress={() => {props.navigation.navigate('LoginScreen')}}>
            <View style={styles.button_text}>
              <Text style = {styles.buttonText}>I Have an Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}
//<Image stlye = {styles.logo} source={require('../../assets/Rmap.png')}></Image>
//<Image source={require('../../assets/main_1.png')}></Image>
//<Image source={require('../../assets/asset-1.svg')}></Image>

export default WelcomeScreen;

const styles = StyleSheet.create({
    safe_container:{
      flex:1,
      backgroundColor: '#2C4EDC',
    },
    container:{ 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#2C4EDC',
    },

    logo:{
      height:46,
      width:135,
      marginTop: 35,
    },
   
    text:{
      marginTop:20,
      fontSize: 36, 
      fontWeight: "bold",
      alignItems: 'center', 
      color: "#FFF",
      textAlign: 'center',
      marginBottom:30
    },

    signup_container:{
      marginTop:30,
      backgroundColor:'#478BFF',
      width:'70%',
      minHeight:60,
      justifyContent:'center',
      borderRadius:10
    },
    button_text:{
      //backgroundColor :"black",
      width: "100%",
      alignItems: 'center'
    },
    
    buttonText:{
      fontSize: 20, 
      fontWeight: "bold",
      //alignSelf: "center ",
      color: "#478BFF",
    },
    
    signup_Text:{
      fontSize: 20, 
      fontWeight: "bold",
      //alignSelf: "center ",
      color: "#FFF",
    },

    account_container:{
      marginTop:20,
      backgroundColor:'white',
      width:'70%',
      minHeight:60,
      justifyContent:'center',
      borderRadius:10
    },
    
    account_button:{
      backgroundColor: "#F6F7F9",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignItems: 'center',
      position: 'absolute',
      paddingLeft:38,
      paddingRight:38,
      textAlign: 'center',
    }
});