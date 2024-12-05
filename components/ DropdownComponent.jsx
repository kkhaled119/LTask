import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const DropdownComponent = ({ selectedCategory, onCategoryChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const categories = ["Work", "Personal", "Urgent", "Later"];

  const handleCategorySelect = (category) => {
    onCategoryChange(category); // Pass selected category back to parent
    setIsModalVisible(false); // Close the dropdown after selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedCategory}>
          {selectedCategory || "Select Category"}
        </Text>
      </TouchableOpacity>

      {/* Modal for dropdown options */}
      {isModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.optionText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  selectedCategory: {
    fontSize: 16,
    color: "#333",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
});

export default DropdownComponent;
