import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="prodashboard"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
};

export default _layout;
