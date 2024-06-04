import { Text, View, StyleSheet } from "react-native";
import React from "react";
import Login from "../Screens/LoginScreen/Login";
import { StatusBar } from "expo-status-bar";
import { Clerk, ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

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
  return (
    <>
      <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_ZGVjaWRpbmctc2hhZC05LmNsZXJrLmFjY291bnRzLmRldiQ">
        <View>
          <StatusBar style="dark" backgroundColor="#D2D2D2" />
        </View>
        <View style={styles.container}>
          {/* SignIn */}
          <SignedIn>
            <Text>You are Signed in</Text>
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