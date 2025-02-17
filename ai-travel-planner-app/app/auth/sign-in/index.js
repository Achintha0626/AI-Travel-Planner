import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState(""); // Fixed useState default values
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      const message = "Please enter both email and password.";
      Platform.OS === "android"
        ? ToastAndroid.show(message, ToastAndroid.SHORT)
        : Alert.alert("Error", message);
      return;
    }

    try {
      console.log("Logging in with:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Signed in as:", userCredential.user.email);
      router.replace("/mytrip"); 
    } catch (error) {
      console.error("Sign-In Error:", error.code, error.message);

      let errorMsg = "Sign-in failed. Please try again.";
      if (error.code === "auth/invalid-credential") {
        errorMsg = "Invalid email or password.";
      } else if (error.code === "auth/user-not-found") {
        errorMsg = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMsg = "Incorrect password.";
      } else if (error.code === "auth/network-request-failed") {
        errorMsg = "Network error. Please check your internet connection.";
      }

      Platform.OS === "android"
        ? ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        : Alert.alert("Sign-In Failed", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.subtitle}>You've been missed</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor={Colors.DARK_GRAY}
          value={email}
          onChangeText={(value) => setEmail(value)} // Fixed onChangeText
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor={Colors.DARK_GRAY}
          value={password}
          onChangeText={(value) => setPassword(value)} // Fixed onChangeText
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={styles.createAccountButton}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
    height: "100%",
    marginTop: 40,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 30,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: 30,
    color: Colors.GRAY,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: "outfit",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  signInButton: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
  createAccountButton: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
