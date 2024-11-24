import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");
const SliderItem = ({ item, index }) => {
  return (
    <View style={styles.itemsContiner}>
      <Image source={item.image} style={{ width: 300, height: 400 }} />
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemsContiner: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
  },
});
