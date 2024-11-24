import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, Text, View } from "react-native";

const DropdownComponent = ({ value, setValue, data }) => {
  // تخصيص الخيارات بإضافة أيقونات بجانب النصوص
  const renderItem = (item) => (
    <View style={styles.option}>
      <AntDesign name={item.icon} size={20} color="black" style={styles.icon} />
      <Text style={styles.optionText}>{item.label}</Text>
    </View>
  );

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={500}
      labelField="label"
      valueField="value"
      placeholder="Select category"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderItem={renderItem} // تخصيص عرض الخيارات
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  optionText: {
    fontSize: 16,
  },
});
