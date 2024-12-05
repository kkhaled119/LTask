import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigate = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      navigate.replace("signin");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>User Name</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>

        <Text style={styles.header}>Settings</Text>

        <TouchableOpacity style={styles.option}>
          <AntDesign name="user" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="notifications" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <AntDesign name="lock" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigate.navigate("/pricing")}
        >
          <FontAwesome name="dollar" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Pricing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <FontAwesome6 name="key" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E9",
  },
  scrollContent: {
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BF3F00",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
