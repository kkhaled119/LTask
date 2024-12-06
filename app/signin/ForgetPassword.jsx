import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import APILINK from "../../constant"; // Make sure this path is correct

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${APILINK}/auth/users/reset_password/`,
        { email }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("signin")}>
          <Text style={styles.backText}>Back to login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textSection}>
        <Text style={styles.header}>Forgot your password?</Text>
        <Text style={styles.description}>
          Don’t worry, happens to all of us. Enter your email below to recover
          your password.
        </Text>

        {error && <Text style={styles.error}>{error}</Text>}
        {success && (
          <Text style={styles.success}>
            Password reset email sent! Please check your inbox.
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Button
          title={loading ? "Confirming..." : "Confirm Email"}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>

      <View style={styles.imageSection}>
        <Image
          source={require("../../assets/images/ForgetPassword.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF6E9",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  textSection: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  success: {
    color: "green",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  imageSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ForgetPassword;
