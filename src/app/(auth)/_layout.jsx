import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index" // This is the default screen and also the first screen that will be shown
        options={{   // You do not need to specify the directory for this one it will automatically find the file according to the name
          headerShown: false,
          title: "",
          headerStyle: {
            shadowOpacity: 0, // This is to remove the shadow of the header for ios
            elevation: 0,     // This is to remove the shadow of the header for android
          },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "Authentication",
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          headerShown: true,
          title: "Password Recovery",
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="recover"
        options={{
          headerShown: true,
          title: "Password Recovery",
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "Registration",
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="(dashboard)" // This directory will be called if the authentication is successful and its index.jsx will run
        options={{
          headerShown: false,
          title: "",
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      {/* Still don't understand on how this one works */}
      {/* This will be called by the (dashboard) _layout file to be placed at the right side header of the screen of index.jsx on that directoy */}
      <Stack.Screen name="modal" options={{ presentation: "modal", title: "Things to consider" }} />
    </Stack>
  );
};

export default AuthLayout;
