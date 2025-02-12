import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from "@/src/context/auth-context";
// _layout is a special file used to define a shared layout for multiple screens within a folder.
// It works like a wrapper that automatically applies to all routes inside that directory.
// It behaves like a parent component for nested screens
// Useful for navigation bars, authentication wrappers, global styling, or persistent components.
const RootLayout = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <Stack>
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default RootLayout;