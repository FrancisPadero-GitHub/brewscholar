import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomFont from "@/src/components/CustomFont";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { supabase } from "@/src/database/supabase"; // Supabase instance


const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  // Functions
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
    Keyboard.dismiss();
  };

  const goToSignUpScreen = () => {
    router.replace("signup");
  };

  const gotoForgotPassword = () => {
    // router.push("forgot");
    return null;
  };


  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check if fields are empty
    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage("Email and password are required.");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (error) {
        throw new Error(error.message); // Throw error to be caught in the catch block
      }

      if (data?.session) {
        router.replace("(dashboard)"); // Redirect to dashboard after successful login
      }
    } catch (err) {
      setErrorMessage(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Ensures loading state is reset
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.blackCont}>
        <View style={styles.textInputsContainer}>
          {errorMessage ? (
            <CustomFont style={styles.errorMsg} fontType="Regular">
              {errorMessage}
            </CustomFont>
          ) : null}

          <TextInput
            style={styles.emailInput}
            value={email}
            placeholder="Email"
            placeholderTextColor="#1e1e1e"
            onChangeText={setEmail}
            keyboardType="default"
            autoComplete="email"
          />

          <View style={styles.form}>
            <TextInput
              style={styles.passInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#1e1e1e"
              keyboardType="default"
              autoComplete="password"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              activeOpacity="100%"
            >
              <Ionicons
                style={styles.eyeIcon}
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="#1e1e1e"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signinButton} onPress={handleLogin}>
            <CustomFont style={styles.signintext} fontType="Bold">
              {loading ? <ActivityIndicator color="tomato" size="large" /> : "Login"}
            </CustomFont>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.linkButton} onPress={goToSignUpScreen}>
          <CustomFont style={styles.textLink} fontType="Bold">
            Don't have an account? Sign Up
          </CustomFont>
        </TouchableOpacity>

        <CustomFont style={[styles.orTxt]} fontType="Regular">
          Or
        </CustomFont>

        <TouchableOpacity style={styles.buttonGoogle}>
          <Image
            style={styles.googleSignLogo}
            source={require("../../../assets/images/GoogleSignIn.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={gotoForgotPassword}>
          <CustomFont style={styles.textLink} fontType="Bold">
            Forgot Password?
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

}

export default LoginScreen;

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
  errorMsg: {
    fontSize: 12,
    color: "tomato",
  },
  orTxt: {
    textAlign: "center",
    color: "#999999",
    marginTop: 25,
    marginBottom: 25,
  },
  buttonGoogle: {
    width: 200,
    height: 50,
    marginBottom: "10%",
  },
  googleSignLogo: {
    width: "100%",
    height: "100%",
  },
  textInputsContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 110,
    width: "85%",
    height: 200,
    margin: 10,
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#1e1e1e",
    width: "90%",
    height: "25%",
    borderWidth: 2,
    borderRadius: 10,
  },
  passInput: {
    width: "90%",
    height: "100%",
    padding: 10,
    borderRadius: 10,
  },
  emailInput: {
    backgroundColor: "#f5f5f5",
    borderColor: "#1e1e1e",
    width: "90%",
    height: "25%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  signintext: {
    fontSize: 15,
    color: "#1e1e1e",
  },
  signinButton: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#FFD700",
    alignItems: "center",
    width: "90%",
    height: "20%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
});
