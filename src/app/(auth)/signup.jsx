import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomFont from "@/src/components/CustomFont";
import { useRouter } from "expo-router";
import { supabase } from "@/src/database/supabase";

const SignUpScreen = () => {
  const router = useRouter(); // Screen navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
    Keyboard.dismiss();
  };

  // Navigate to Login Screen
  const goToLoginScreen = () => {
    router.replace("login");
  };

  // Signup Logic with Validation
  async function handleSignup() {
    Keyboard.dismiss();
    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    // Trim input values to remove unwanted spaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPass = confirmPass.trim();

    // Check if all fields are filled
    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPass) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setEmail("")
      setLoading(false);
      return;
    }

    // Check password match
    if (trimmedPassword !== trimmedConfirmPass) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.session) {
        Alert.alert(
          "Success",
          `Welcome to BrewScholar! Please Check your inbox to confirm.`
        );
        router.replace("login"); // Redirect to login after successful signup
      }
    } catch (err) {
      setErrorMessage(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.blackCont}>
        <View style={styles.formContainer}>
          {errorMessage ? (
            <CustomFont style={styles.errorMsg} fontType="Regular">
              {errorMessage}
            </CustomFont>
          ) : null}

          <TextInput
            placeholder="Email"
            placeholderTextColor="#1e1e1e"
            style={styles.emailInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passConts}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#1e1e1e"
              style={styles.passInputs}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                style={styles.eyeIcon}
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="#1e1e1e"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passConts}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#1e1e1e"
              style={styles.passInputs}
              value={confirmPass}
              onChangeText={setConfirmPass}
              secureTextEntry={!isPasswordVisible}
            />
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignup}
            disabled={loading}
          >
            <CustomFont style={styles.signUpText} fontType="Bold">
              {loading ? <ActivityIndicator color="tomato" size="large" /> : "Sign Up"}
            </CustomFont>
          </TouchableOpacity>
        </View>

        <CustomFont style={styles.orTxt} fontType="Regular">
          Or
        </CustomFont>

        <TouchableOpacity style={styles.buttonGoogle}>
          <Image
            style={styles.googleSignLogo}
            source={require("../../../assets/images/GoogleSignIn.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={goToLoginScreen}>
          <CustomFont style={styles.textLink} fontType="Bold">
            Already have an account? Login
          </CustomFont>
        </TouchableOpacity>
      </View>

      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("../../../assets/images/BrewScholar.png")}
          resizeMode="contain"
        />
      </View>

      <CustomFont style={[styles.commonQuote, styles.quote1]} fontType="Bold">
        Pour over opportunities
      </CustomFont>

      <CustomFont style={[styles.commonQuote, styles.quote2]} fontType="Bold">
        and brew up your brightest future with
      </CustomFont>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
  },
  blackCont: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    width: "100%",
    height: "80%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  formContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: "85%",
    height: 260,
    marginTop: "26%",
  },
  emailInput: {
    backgroundColor: "#f5f5f5",
    borderColor: "#1e1e1e",
    width: "90%",
    height: "15%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  passConts: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    width: "90%",
    height: "15%",
    borderWidth: 2,
    borderRadius: 10,
  },
  passInputs: {
    width: "90%",
    height: "100%",
    padding: 10,
  },
  orTxt: {
    textAlign: "center",
    color: "#999999",
    marginTop: 15,
    marginBottom: 15,
  },
  buttonGoogle: {
    width: 200,
    height: 50,
    marginBottom: "6%",
  },
  googleSignLogo: {
    width: "100%",
    height: "100%",
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "white",
    aspectRatio: 1,
    height: "25%",
    position: "absolute",
    top: "7%",
  },
  img: {
    width: "100%",
    height: "100%",
    aspectRatio: 0.7,
    resizeMode: "contain",
  },
  commonQuote: {
    color: "#1e1e1e",
    fontSize: 15,
    letterSpacing: 2,
    textAlign: "center",
    position: "absolute",
  },
  quote1: {
    top: 1,
  },
  quote2: {
    top: 22,
  },
  linkButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textLink: {
    textDecorationLine: "underline",
    fontSize: 14,
    color: "#999999",
    letterSpacing: 1,
  },
  signUpText: {
    fontSize: 15,
    color: "#1e1e1e",
  },
  signUpButton: {
    width: "90%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  errorMsg: {
    fontSize: 12,
    color: "tomato",
  },
});
