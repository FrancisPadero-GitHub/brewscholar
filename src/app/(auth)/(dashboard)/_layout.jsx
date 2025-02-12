import { StyleSheet, Pressable, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Link } from "expo-router";
import { TransitionPresets } from "@react-navigation/bottom-tabs";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        ...TransitionPresets.ShiftTransition,
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },

          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="information-circle-outline"
                    size={30}
                    color={"goldenrod"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                style={styles.mainLogo}
                source={require("../../../../assets/images/BrewScholar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          tabBarLabel: "Applications",
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-outline" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                style={styles.mainLogo}
                source={require("../../../../assets/images/BrewScholar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarLabel: "Notifications",
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                style={styles.mainLogo}
                source={require("../../../../assets/images/BrewScholar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Me",
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                style={styles.mainLogo}
                source={require("../../../../assets/images/BrewScholar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1e1e1e",
    borderTopColor: "transparent",
    borderTopWidth: 0,
  },
  mainLogo: {
    width: "100%",
    height: "100%",
    aspectRatio: 0.75,
    resizeMode: "contain",
    marginLeft: 10,
  },
});
