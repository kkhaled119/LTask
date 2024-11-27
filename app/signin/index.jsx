import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Slices/AuthSlice/LoginReducer";
import { useRouter } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
      Alert.alert("Error", "Please fill in both email and password fields.");
    } else if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
    } else if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
    } else {
      setLoading(true); // Show loading indicator
      try {
        const formData = { email, password };
        const resultAction = await dispatch(loginUser(formData)); // Dispatch login action

        if (loginUser.fulfilled.match(resultAction)) {
          // Only redirect if login is successful
          Alert.alert("Success", "Logged in successfully!");
          router.push("/freeDashboard");
        } else {
          Alert.alert("Error", "Login failed. Please check your credentials.");
        }
      } catch (error) {
        Alert.alert("Error", "An unexpected error occurred.");
      } finally {
        setLoading(false); // Hide loading indicator after login attempt
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign
          name="leftcircleo"
          size={30}
          color="black"
          style={styles.backButton}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Add your email and password</Text>
        <TextInput
          placeholder="Your email"
          placeholderTextColor="black"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Your password"
          placeholderTextColor="black"
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Show loading indicator when submitting */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/signup")}
        style={{ padding: 10, textAlign: "center", alignSelf: "center" }}
      >
        <Text style={{ fontSize: 19 }}>You don't have an account? </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6E9",
    flex: 1,
  },
  backButton: {
    marginLeft: 10,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 19,
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
  },
  inputPassword: {
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
  },
  button: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#BF3F00",
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
