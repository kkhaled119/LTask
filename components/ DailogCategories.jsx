import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const DailogCategories = [
  { id: 1, name: "Grocery", icon: "shoppingcart" },
  { id: 2, name: "Work", icon: "calendar" },
  { id: 3, name: "Sport", icon: "dribbble" },
  { id: 4, name: "Home", icon: "home" },
  { id: 5, name: "Design", icon: "layout" },
  { id: 6, name: "University", icon: "book" },
  { id: 7, name: "Social", icon: "team" },
  { id: 8, name: "Music", icon: "sound" },
  { id: 9, name: "Health", icon: "heart" },
  { id: 10, name: "Movie", icon: "video-camera" },
];

const CategoryList = () => {
  return (
    <FlatList
      data={DailogCategories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.categoryItem}>
          {item.iconLibrary === "AntDesign" ? (
            <AntDesign name={item.icon} size={10} color="black" />
          ) : (
            <MaterialIcons name={item.icon} size={24} color="black" />
          )}
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryName: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CategoryList;
