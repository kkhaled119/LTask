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
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getUserData } from "../../../redux/Slices/UserProfile/UserProfileReducer";

const Setting = () => {
  const { userData } = useSelector((state) => state.userprofile);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "Egypt",
    imageUrl: "https://placekitten.com/200/200",
  });

  useEffect(() => {
    dispatch(getUserData({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    if (userData) {
      setProfile({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        country: "Egypt",
        imageUrl: "https://placekitten.com/200/200",
      });
    }
  }, [userData]);

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
              uri: profile.imageUrl,
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{profile.first_name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>

        <Text style={styles.header}>Settings</Text>

        {/** Option List */}
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
          onPress={() => navigate.navigate("pricing")}
        >
          <FontAwesome name="dollar" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Pricing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <FontAwesome6 name="key" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionLogout} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FFF" />
          <Text style={styles.optionLogoutText}>Logout</Text>
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
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderColor: "#BF3F00",
    borderWidth: 2,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#BF3F00",
    marginBottom: 20,
    textAlign: "left",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
    fontWeight: "500",
  },
  optionLogout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#BF3F00",
    borderRadius: 10,
    marginTop: 20,
  },
  optionLogoutText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
