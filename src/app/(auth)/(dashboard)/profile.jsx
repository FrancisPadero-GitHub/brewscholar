import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/src/database/supabase";
import CustomFont from "@/src/components/CustomFont";

const ProfileScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe(); // Cleanup listener on component unmount
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Log the user out
    setSession(null); // Reset session state
    router.replace("login"); // Redirect to the Welcome screen
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.blackCont}>
        <CustomFont style={{ color: "white" }} fontType="Bold">
          PROFILE AREA
        </CustomFont>
        {session ? (
          <>
            <Text style={{ color: "white", marginTop: 10 }}>
              Logged in as: {session.user.email}
            </Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ color: "white", marginTop: 10 }}>
            You are not logged in.
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

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
    height: "90%",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    position: "absolute",
    bottom: 0,
    overflow: "hidden", // disables horizontal scrolling
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

  logoutButton: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
