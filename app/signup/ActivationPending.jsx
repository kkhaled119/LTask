import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ActivationPending = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const navigation = useNavigation();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      Alert.alert(
        "Didn't receive an email?",
        "Please check your spam folder or request a new activation link."
      );
    }
  }, [timeLeft]);

  const handleResendEmail = () => {
    // API call to resend email (mocked for now)
    Alert.alert("Success", "Activation email sent. Check your inbox.");
  };

  const handleLoginRedirect = () => {
    navigation.navigate("signin");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Activation Pending</Text>
      <Text style={styles.description}>
        We've sent an activation email to the email address you provided. Please
        check your inbox (and spam folder) for the activation link.
      </Text>
      <Text style={styles.timer}>
        Time remaining:{" "}
        <Text style={styles.boldText}>{formatTime(timeLeft)}</Text>
      </Text>

      <TouchableOpacity style={styles.resendButton} onPress={handleResendEmail}>
        <Text style={styles.buttonText}>Resend Activation Email</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Didn't receive the email? Make sure to check your spam folder or try
        again later.
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={handleLoginRedirect}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    backgroundColor: "#FFF6E9",
  },
  header: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  description: {
    fontSize: width * 0.045,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  timer: {
    fontSize: width * 0.05,
    color: "#333",
    marginBottom: height * 0.02,
  },
  boldText: {
    fontWeight: "bold",
    color: "#BF3F00",
  },
  resendButton: {
    backgroundColor: "#BF3F00",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: 8,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: "#FFF",
    fontSize: width * 0.045,
    textAlign: "center",
  },
  footerText: {
    fontSize: width * 0.04,
    color: "#777",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  backButton: {
    marginTop: height * 0.02,
  },
  backButtonText: {
    fontSize: width * 0.045,
    color: "#BF3F00",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default ActivationPending;
