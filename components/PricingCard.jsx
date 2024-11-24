import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

function PricingCard({
  icon: Icon,
  header,
  headerDescription,
  price,
  priceDescription,
  buttonText,
  features,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{Icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.headerDescription}>{headerDescription}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.priceDescription}>{priceDescription}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.feature}>
            <Text style={styles.checkMark}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    width: "100%",
    marginHorizontal: "auto",
    marginBottom: 20,
    transition: "transform 0.3s",
  },
  iconContainer: {
    backgroundColor: "#BF3F00", // Set background color
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4B5563", // Gray color
  },
  headerDescription: {
    fontSize: 16,
    color: "#6B7280", // Gray color
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4B5563", // Gray color
  },
  priceDescription: {
    fontSize: 16,
    color: "#6B7280", // Gray color
  },
  button: {
    backgroundColor: "#BF3F00",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  featuresContainer: {
    marginBottom: 20,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkMark: {
    color: "#10B981", // Green color for check mark
    fontSize: 20,
    marginRight: 8,
  },
  featureText: {
    fontSize: 16,
    color: "#4B5563", // Gray color
  },
});

export default PricingCard;
