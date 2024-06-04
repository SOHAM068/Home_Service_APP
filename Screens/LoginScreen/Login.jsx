import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.LoginImage} source={require('../../assets/Images_InUse/login.png')} />
      <View style={styles.subContainer}>
        <Text style={{color:'white', fontSize:23, textAlign:'center'}}>
          Let's Find <Text style={{fontWeight:'bold', color:'yellow'}}>Professional Cleaning and Repair</Text> Service
        </Text>
        <Text style={{color:'white', textAlign:'center', marginTop:20}}>Best App to find services near you which deliver you a professional service</Text>
        <TouchableOpacity style={styles.Button} onPress={onPress}>
          <Text style={{color:Colors.Primary, fontWeight:'bold', textAlign:'center', fontSize:15}}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Login;
const styles = StyleSheet.create({
  container:{
    // marginLeft:10,
    marginTop:40,
    alignItems: 'center',
  },
  LoginImage:{
    width: 230,
    height: 450,
    borderWidth: 3,
    borderColor: Colors.Black,
    borderRadius: 10,
  },
  subContainer:{
    width: '100%',
    height: '70%',
    backgroundColor: Colors.Primary,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -20,
    padding: 20,
  },
  Button:{
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 40,
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  }
})