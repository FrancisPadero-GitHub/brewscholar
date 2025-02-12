import { StyleSheet, View } from "react-native";
import React from "react";
import CustomFont from "@/src/components/CustomFont";

const modal = () => {
  return (
    <View style={styles.container}>
      <CustomFont fontType="Bold">
        All offers listed in the application is still just a static data
      </CustomFont>
    </View>
  );
};

export default modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
