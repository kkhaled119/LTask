import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SliderItem from "./SliderItem";

const Slider = () => {
  const data = [
    {
      id: "1",
      title: "Item 1",
      image: require("../assets/images/1.png"),
    },
    {
      id: "2",
      title: "Item 2",
      image: require("../assets/images/4.png"),
    },
    {
      id: "3",
      title: "Item 3",
      image: require("../assets/images/5.png"),
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
