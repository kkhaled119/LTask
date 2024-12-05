import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CategoriesList = ({ Categories, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategoryClick(categoryId);
  };

  if (!Categories || Categories.length === 0) {
    return <Text style={styles.noDataText}>No categories available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Category</Text>
      <FlatList
        data={Categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.id && styles.selectedButton,
            ]}
            onPress={() => handleCategoryClick(item.id)}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={selectedCategory === item.id ? "#FFA500" : "#000"}
            />
          </TouchableOpacity>
        )}
      />
      <Text style={styles.selectedCategoryText}>
        {selectedCategory
          ? `Selected Category: ${
              Categories.find((cat) => cat.id === selectedCategory)?.name
            }`
          : "No category selected"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: "#FFF6E9",
    borderColor: "#FFA500",
    borderWidth: 2,
  },
  selectedCategoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#4A90E2",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#FF0000",
    marginTop: 20,
  },
});

export default CategoriesList;
