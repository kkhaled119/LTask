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
import { useRouter } from "expo-router";
import { getUserData } from "../../../redux/Slices/UserProfile/UserProfileReducer";
import { useDispatch, useSelector } from "react-redux";

const Setting = () => {
  const { loading, error, userData } = useSelector(
    (state) => state.userprofile
  );
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "Egypt",
    imageUrl: "https://placekitten.com/200/200", // placeholder image
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

  const handleSave = (values) => {
    setProfile(values);
    setIsEditing(false);
  };

  const router = useRouter();
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
          <Text style={styles.username}>
            {profile.first_name || "Name not available"}
          </Text>
          <Text style={styles.email}>
            {profile.email || "Email not available"}
          </Text>
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
          onPress={() => router.push("/pricing")}
        >
          <FontAwesome name="dollar" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Pricing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <FontAwesome6 name="key" size={24} color="#BF3F00" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("./index")}
        >
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
    padding: 16, // إضافة padding للمحتوى داخل ScrollView
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10, // لتوفير مساحة جانبية
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
