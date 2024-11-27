import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Prodashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF6E9" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Tasks With AI</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 15 }}>No tasks avalibale</Text>
      </View>
    </SafeAreaView>
  );
};

export default Prodashboard;

const styles = StyleSheet.create({});
