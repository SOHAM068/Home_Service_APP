import { Text, View, StyleSheet } from "react-native";
import React from "react";
import Login from "../Screens/LoginScreen/Login";
import { StatusBar } from "react-native";
import { Clerk, ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "../Navigation/TabNavigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function Index() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
  });
  return (
    <>
      <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_ZGVjaWRpbmctc2hhZC05LmNsZXJrLmFjY291bnRzLmRldiQ">
        <View>
          <StatusBar barStyle={'dark-content'} backgroundColor="#D2D2D2" />
        </View>
        <View style={styles.container}>
          {/* SignIn */}
          <SignedIn>
              <TabNavigation />
          </SignedIn>
          {/* SignOut */}
          <SignedOut>
            <Login />
          </SignedOut>
        </View>
      </ClerkProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
})