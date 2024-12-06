import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/Slices/AuthSlice/AuthReducer";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import GoogleIcon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const route = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, user, error, activationSuccess } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (termsAccepted) {
      dispatch(signUpUser(formData));
    } else {
      Alert.alert("Error", "You have to accept the terms and conditions");
    }
  };

  useEffect(() => {
    if (user) {
      Alert.alert("Success", "User Registered Successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("ActivationPending");
          },
        },
      ]);
    }
    if (error) {
      const errorMessage =
        error.data?.email?.[0] ||
        error.data?.message ||
        "Something went wrong.";
      Alert.alert("Error", errorMessage);
    }
    if (activationSuccess) {
      Alert.alert("Success", "Account Activated Successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Login");
          },
        },
      ]);
    }
  }, [user, error, activationSuccess, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>
        Let’s get you all set up so you can access your personal account.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.first_name}
          onChangeText={(value) => handleInputChange("first_name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.last_name}
          onChangeText={(value) => handleInputChange("last_name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={formData.re_password}
          onChangeText={(value) => handleInputChange("re_password", value)}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <Text style={styles.checkboxText}>
            {termsAccepted ? "✓" : "□"} I agree to the terms and Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.linkText} onPress={() => route.push("./signin")}>
          Login
        </Text>
      </Text>

      <View style={styles.googleButton}>
        <Text style={styles.googleText}>Or Sign up with</Text>
        <TouchableOpacity onPress={() => navigation.navigate("GoogleAuth")}>
          <Text style={styles.googleText}> Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "center",
    backgroundColor: "#FFF6E9",
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    fontSize: width * 0.05,
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.07,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: height * 0.02,
    paddingLeft: width * 0.04,
  },
  checkboxContainer: {
    marginBottom: height * 0.02,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: width * 0.04,
  },
  submitButton: {
    backgroundColor: "#BF3F00",
    padding: height * 0.02,
    borderRadius: 8,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05,
  },
  loginText: {
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  linkText: {
    color: "#BF3F00",
  },
  googleButton: {
    alignItems: "center",
  },
  googleText: {
    color: "#BF3F00",
    fontSize: width * 0.04,
  },
});

export default SignUp;
