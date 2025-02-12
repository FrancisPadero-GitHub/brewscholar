import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomFont from "@/src/components/CustomFont";

// I still have to redesign the notification area on what notifications I want to push in here.

const dummyData = [
  {
    id: "2",
    title: "Scholarship 2",
    subtitle: "Subtitle 2",
    date: "2023-10-02",
    status: "Approved",
  },
  {
    id: "3",
    title: "Scholarship 3",
    subtitle: "Subtitle 3",
    date: "2023-10-03",
    status: "Rejected",
  },
];

const ScholarshipItem = ({ item }) => (
  <TouchableOpacity style={styles.scholarshipCard}>
    <Ionicons
      name={
        item.status === "Pending"
          ? "time-outline"
          : item.status === "Approved"
            ? "checkmark-circle-outline"
            : "sad-outline"
      }
      style={styles.scholarshipLogo}
      size={35}
    />
    <View style={styles.scholarshipTextContainer}>
      <Text style={styles.scholarshipTitle}>{item.title}</Text>
      <Text style={styles.scholarshipSubtitle}>{item.subtitle}</Text>
      <Text style={styles.scholarshipDate}>{item.date}</Text>
      <Text
        style={[
          styles.scholarshipStatus,
          {
            color:
              item.status === "Pending"
                ? "orange"
                : item.status === "Approved"
                  ? "green"
                  : "red",
          },
        ]}
      >
        {item.status}
      </Text>
    </View>
  </TouchableOpacity>
);

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.blackCont}>
        <CustomFont fontType="Bold" style={{ color: "white" }}>
          Notification Area
        </CustomFont>

        <FlatList
          data={dummyData} // Use dummy data here
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ScholarshipItem item={item} />}
          contentContainerStyle={styles.scholarshipList}
          showsVerticalScrollIndicator={true}
          indicatorStyle="white"
          horizontal={false}
          style={styles.flatList} // Add this style
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    position: "relative",
  },
  blackCont: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    width: "100%",
    height: "95%",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    position: "absolute",
    bottom: 0,
    overflow: "hidden", // disables horizontal ??
  },

  mainLogo: {
    width: "100%",
    height: "100%",
    aspectRatio: 0.75,
    resizeMode: "contain",
  },

  // Cards on the scholarship
  flatList: {
    width: "100%", // Ensures the FlatList takes the full width of the container
    paddingTop: "5%",
  },
  scholarshipList: {
    width: "100%",
    paddingHorizontal: 23,
  },
  scholarshipCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  scholarshipLogo: {
    marginRight: 12,
  },

  scholarshipTextContainer: {
    flex: 1,
  },
  scholarshipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  scholarshipSubtitle: {
    fontSize: 14,
    color: "#ff9900",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  scholarshipDate: {
    fontSize: 12,
    color: "#888",
  },
  scholarshipStatus: {
    paddingTop: "2%",
    fontSize: 12,
    fontWeight: "bold",
  },
});
