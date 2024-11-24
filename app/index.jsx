import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Slider from "../components/Slider";
import Animated, { FadeIn, FadeOut, FadeInDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const handleGoogleAuth = () => {
    dispatch(googleAuth());
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF6E9", flex: 1 }}>
      <Image source={require("../assets/images/OO.png")} style={styles.logo} />
      <View style={styles.sliderContainer}>
        <Slider />
      </View>

      <Animated.View entering={FadeInDown.delay(200).springify()}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleAuth}
        >
          <Text
            style={{
              color: "black",
              fontSize: 17,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="google"
              size={wp(5)}
              color="#BF3F00"
              style={styles.googleIcon}
            />
            Continue With Google
          </Text>
        </TouchableOpacity>
        <Link href="/signin" asChild>
          <TouchableOpacity style={styles.emailButton}>
            <Text style={styles.emailButtonText}>Continue With Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6E9",
    flex: 1,
  },
  logo: {
    width: wp(50),
    height: hp(7),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp(3),
  },
  sliderContainer: {
    marginTop: hp(5),
  },
  googleButton: {
    alignItems: "center",
    paddingVertical: hp(2),
    backgroundColor: "#FFF6E9",
    marginTop: hp(5),
    width: wp(70),
    alignSelf: "center",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "black",
    fontSize: wp(3),
    alignItems: "center",
    flexDirection: "row",
  },
  googleIcon: {
    marginBottom: 2,
    marginRight: 5,
  },
  emailButton: {
    alignItems: "center",
    paddingVertical: hp(2),
    backgroundColor: "#BF3F00",
    width: wp(70),
    marginTop: hp(2),
    alignSelf: "center",
    borderRadius: wp(5),
  },
  emailButtonText: {
    color: "white",
    fontSize: wp(4),
  },
});
