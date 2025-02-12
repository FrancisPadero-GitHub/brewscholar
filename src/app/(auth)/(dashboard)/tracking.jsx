import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView, // This one is to avoid the notch screen on the IOS
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomFont from "@/src/components/CustomFont";

export const scholarships = [
  {
    id: "1",
    title: "DOST - SEI S&T",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: October 20, 2024",
    status: "Pending",
  },
  {
    id: "2",
    title: "SM COLLEGE",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: October 20, 2024",
    status: "Approved",
  },
  {
    id: "3",
    title: "SAMPLE OFFER",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: October 20, 2024",
    status: "Rejected",
  },
  {
    id: "4",
    title: "CHED STUDY GRANT",
    subtitle: "POSTGRADUATE SCHOLARSHIP",
    date: "Date Applied: October 15, 2024",
    status: "Approved",
  },
  {
    id: "5",
    title: "GLOBAL EXCELLENCE",
    subtitle: "INTERNATIONAL SCHOLARSHIP",
    date: "Date Applied: October 10, 2024",
    status: "Pending",
  },
  {
    id: "6",
    title: "LOCAL TALENT PROGRAM",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: October 5, 2024",
    status: "Rejected",
  },
  {
    id: "7",
    title: "SCIENCE AND MATH GRANT",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: September 30, 2024",
    status: "Approved",
  },
  {
    id: "8",
    title: "EXCELLENCE IN ENGINEERING",
    subtitle: "POSTGRADUATE SCHOLARSHIP",
    date: "Date Applied: September 25, 2024",
    status: "Pending",
  },
  {
    id: "9",
    title: "MINISTRY OF EDUCATION",
    subtitle: "FULL SCHOLARSHIP PROGRAM",
    date: "Date Applied: September 20, 2024",
    status: "Approved",
  },
  {
    id: "10",
    title: "ARTS AND HUMANITIES",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: September 15, 2024",
    status: "Rejected",
  },
  {
    id: "11",
    title: "TECHNOLOGY FOR THE FUTURE",
    subtitle: "TECHNICAL SCHOLARSHIP",
    date: "Date Applied: September 10, 2024",
    status: "Pending",
  },
  {
    id: "12",
    title: "ENVIRONMENTAL STUDIES GRANT",
    subtitle: "GRADUATE SCHOLARSHIP",
    date: "Date Applied: September 5, 2024",
    status: "Approved",
  },
  {
    id: "13",
    title: "GLOBAL SCHOLAR PROGRAM",
    subtitle: "INTERNATIONAL SCHOLARSHIP",
    date: "Date Applied: September 1, 2024",
    status: "Rejected",
  },
  {
    id: "14",
    title: "NATIONAL SCIENCE FELLOWSHIP",
    subtitle: "UNDERGRADUATE SCHOLARSHIP",
    date: "Date Applied: August 25, 2024",
    status: "Approved",
  },
  {
    id: "15",
    title: "ENGINEERING EXCELLENCE AWARD",
    subtitle: "POSTGRADUATE SCHOLARSHIP",
    date: "Date Applied: August 20, 2024",
    status: "Pending",
  },
];

// Scholarship item component
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

const TrackingScreen = ({ navigation }) => {
  const nav = () => {
    navigation.navigate("Home Screen");
  };
  return (
    <View style={styles.container}>
      <CustomFont style={styles.infoFont} fontType="Bold">
        Applied Scholarships Status
      </CustomFont>

      <View style={styles.blackCont}>
        <FlatList
          data={scholarships}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ScholarshipItem item={item} />}
          contentContainerStyle={styles.scholarshipList}
          showsVerticalScrollIndicator={true}
          indicatorStyle="white"
          horizontal={false}
          style={styles.flatList} // Add this style
          scrollEventThrottle={16} // Adjust the throttle rate
          onScroll={(event) => {
            const scrollPosition = event.nativeEvent.contentOffset.y;
            // Modify the scroll position to slow down the scroll speed
            event.nativeEvent.contentOffset.y = scrollPosition / 2;
          }}
        />
      </View>
    </View>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",

    position: "relative",
  },
  blackCont: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#1E1E1E",
    width: "100%",
    height: "95%",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    position: "absolute",
    bottom: 0,
    overflow: "hidden", // disables horizontal ???
  },

  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "white",
    height: "8%",
    aspectRatio: 1,
  },
  mainLogo: {
    width: "100%",
    height: "100%",
    aspectRatio: 0.75,
    resizeMode: "contain",
  },

  infoFont: {
    paddingTop: "3%",
    paddingLeft: "25%",
    color: "darkgoldenrod",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
