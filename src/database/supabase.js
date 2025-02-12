import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// You can get this in the supabase dashboard website under Settings > API
const supabaseUrl = "https://buolsfnwesycpwxfmqgz.supabase.co"; // this is used to make API request to my supabase backend
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1b2xzZm53ZXN5Y3B3eGZtcWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMDY5MTYsImV4cCI6MjA1NDY4MjkxNn0.Rcbt-pdRQDDCLp-zZUb1diPrQMiTP_QU7Rpl8cXevJA";
// ⚠️ Security Warning: Be careful with this key. Although it's safe for public use, avoid exposing it unnecessarily.
// I will be implementing a more secure way to handle this in the future.

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    //Stores authentication tokens (e.g., JWT tokens) in React Native’s AsyncStorage so users stay logged in.
    storage: AsyncStorage,
    // Automatically refreshes authentication tokens before they expire.
    autoRefreshToken: true,
    // Ensures user session is saved even after the app is restarted.
    persistSession: true,
    // Disables detecting sessions from URL (this is useful in web apps but not needed in React Native).
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
