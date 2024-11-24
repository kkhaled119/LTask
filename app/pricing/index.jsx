import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import PricingCard from "../../components/PricingCard";
const plans = [
  {
    id: 1,
    name: "Basic Plan",
    description: "Includes basic features\n1GB Storage\n24/7 Support",
    price: "5.00",
  },
  {
    id: 2,
    name: "Premium Plan",
    description: "Includes advanced features\n10GB Storage\nPriority Support",
    price: "15.00",
  },
  {
    id: 3,
    name: "Pro Plan",
    description: "Includes all features\n50GB Storage\nDedicated Support",
    price: "30.00",
  },
];

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF6E9" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pricing Plans</Text>
        </View>
        <View style={styles.gridContainer}>
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              icon={<Ionicons name="alarm" size={24} color="white" />}
              header={plan.name}
              headerDescription={plan.description.split("\r\n")[0]}
              price={`$${parseFloat(plan.price).toFixed(2)}`}
              priceDescription="Per month"
              buttonText="Choose Plan"
              features={plan.description.split("\r\n")}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4B5563", // Gray color
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
