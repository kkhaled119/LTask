import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

import PricingCard from "../../components/PricingCard";
import { fetchPricingData } from "../../redux/Slices/PricingReducer";
const Index = () => {
  const dispatch = useDispatch();

  const { plans, loading, error } = useSelector((state) => state.pricing);

  useEffect(() => {
    dispatch(fetchPricingData());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#BF3F00" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

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
    color: "#4B5563",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6E9",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
