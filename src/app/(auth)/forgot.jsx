import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { supabase } from "@/src/database/supabase"; // Ensure correct import

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [session, setSession] = useState(null);
  const [waitingForEvent, setWaitingForEvent] = useState(true); // Shows loading spinner while waiting
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // Poll session every 5 seconds until the user has clicked the link and logged in automatically is detected
    const interval = setInterval(async () => {
      // Fetch session on initial load
      const fetchSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("Error fetching session:", error.message);
        else setSession(data.session);
      };

      fetchSession(); // Initial session fetch

      // Listen for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });



      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setSession(data.session);
        console.log("Checking session user...");
        console.log("Session data: ", session.user);
        if (session && session.user) {
          console.log("User detected in session: ", session.user);
          setWaitingForEvent(false);
          clearInterval(interval); // Stop polling once event is detected
          Alert.alert("Password Recovery", "Please enter your new password to reset your account.");
          
        }
      }
      return () => {
        authListener.subscription.unsubscribe();
        clearInterval(interval); // Cleanup the polling interval
      };

    }, 5000); // Check every 5 seconds


  }, []);


  //
  const sendResetEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Password reset link sent to your email.");
    }
  };

  //
  const updatePassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert("Error", "Password cannot be empty.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Password updated successfully!");
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
      {!session ? (
        <>
          <Text>Enter your email to reset password:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />

          <TouchableOpacity onPress={sendResetEmail} style={{ backgroundColor: "blue", padding: 10 }}>
            <Text style={{ color: "white" }}>{loading ? "Sending..." : "Send Reset Email"}</Text>
          </TouchableOpacity>
        </>
      ) : waitingForEvent ? (
        <ActivityIndicator size="large" color="#FFD700" /> // Show spinner while waiting for event
      ) : (
        <>
          <Text>Enter New Password:</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
            style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
          />

          <TouchableOpacity onPress={updatePassword} style={{ backgroundColor: "green", padding: 10, marginTop: 10 }}>
            <Text style={{ color: "white" }}>Update Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ResetPassword;
