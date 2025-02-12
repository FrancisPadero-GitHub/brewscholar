import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { supabase } from "@/src/database/supabase";
import CustomFont from "@/src/components/CustomFont";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  // we actually need to get the data from the forgot password event to pass it through here so that the this one can determine
  // what user is being reset
  
  useEffect(() => {
    // Set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change event:", event);
      console.log("Session data:", session);

      if (event === "PASSWORD_RECOVERY") {
        setWaitingForEvent(false);
        console.log("Password recovery event triggered.");
        Alert.alert("Password Recovery", "Please enter your new password to reset your account.");
      }
    });

    // Ensure proper cleanup
    return () => {
      console.log("Cleaning up auth listener...");
      authListener.subscription?.unsubscribe();
    };
  }, []);

  // Handle new password submission
  const handleSubmitNewPassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert("Error", "Password cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        throw new Error(error.message);
      }

      Alert.alert("Success", "Password updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message || "There was an error updating your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {waitingForEvent ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleSubmitNewPassword}
            disabled={loading}
          >
            <CustomFont style={styles.buttonText} fontType="Bold">
              {loading ? "Updating..." : "Update Password"}
            </CustomFont>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#1e1e1e",
  },
});
