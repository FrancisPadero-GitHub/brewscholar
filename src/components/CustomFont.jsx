// CustomFont.js
import React from "react";
import { Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";

const CustomFont = ({ children, style, fontType = "Regular" }) => {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../../assets/fonts/inter.ttf"), // Update path if necessary
    "Inter-Bold": require("../../assets/fonts/InterBold.ttf"), // Update path if necessary
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <Text style={[style, { fontFamily: `Inter-${fontType}` }]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CustomFont;
