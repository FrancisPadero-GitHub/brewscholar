import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import CustomFont from "@/src/components/CustomFont";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/auth-context";

const WelcomeScreen = () => {
  const { session } = useAuth();
  const router = useRouter();

  // Navigation
  const goToLoginScreen = () => {
    router.push("login");
  };

  const goToSignUpScreen = () => {
    router.push("signup");
  };

  if (session) {

  } else {
    return (
      <View style={styles.container}>
        <View style={styles.blackCont}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={goToSignUpScreen}
          >
            <CustomFont style={styles.signUpText} fontType="Bold">
              Sign Up
            </CustomFont>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={goToLoginScreen}>
            <CustomFont style={styles.textLink} fontType="Bold">
              Already have an account? Login
            </CustomFont>
          </TouchableOpacity>
        </View>

        <CustomFont style={[styles.commonQuote, styles.heading]} fontType="Bold">
          Let's Get Started!
        </CustomFont>

        <CustomFont style={[styles.commonQuote, styles.quote1]} fontType="Bold">
          Pour over opportunities
        </CustomFont>

        <CustomFont style={[styles.commonQuote, styles.quote2]} fontType="Bold">
          and brew up your brightest future with
        </CustomFont>

        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/BrewScholar.png")}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    alignItems: "center",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "white",
    width: "50%",
    height: "25%",
    position: "absolute",
    top: "40%",
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
    top: "33%",
  },
  quote2: {
    top: "36%",
  },
  heading: {
    fontSize: 30,
    letterSpacing: 1.5,
    top: "15%",
  },

  blackCont: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    width: "100%",
    height: "45%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
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
    fontSize: 17,
    color: "#1e1e1e",
  },

  signUpButton: {
    width: "65%",
    height: "12%",
    marginTop: 100,
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
