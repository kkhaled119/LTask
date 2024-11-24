import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dashboard" size={12} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
