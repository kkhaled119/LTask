import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

// الحصول على أبعاد الشاشة
const { width, height } = Dimensions.get("window");

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar, // تطبيق تنسيق مخصص للبار
        tabBarActiveTintColor: "#BF3F00",
        tabBarInactiveTintColor: "#8E8E8E",
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="freeDashboard"
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pro-dashboard"
        options={{
          tabBarLabel: "Prodashboard",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF6E9",
    height: height * 0.08,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingBottom: height * 0.01,
  },
  tabBarLabel: {
    fontSize: width * 0.035,
    fontWeight: "600",
  },
  tabBarIcon: {
    fontSize: width * 0.05,
  },
});
