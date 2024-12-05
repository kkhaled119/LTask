import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ModalComponent = ({
  isVisible,
  onClose,
  taskData,
  onSubmit,
  onChange,
  Categories,
  onCategoryChange,
}) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isDueDatePickerVisible, setDueDatePickerVisibility] = useState(false);

  const handleDateConfirm = (selectedDate, fieldName) => {
    if (selectedDate) {
      onChange(fieldName, selectedDate.toISOString());
    }
    if (fieldName === "start_date") setStartDatePickerVisibility(false);
    if (fieldName === "due_date") setDueDatePickerVisibility(false);
  };
  console.log("Categories Data: ", Categories);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Task</Text>

          {/* Task Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={taskData.name}
            onChangeText={(text) => onChange("name", text)}
          />

          {/* Task Description Input */}
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={taskData.description}
            onChangeText={(text) => onChange("description", text)}
          />

          {/* Dropdown for Category */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={Categories}
            labelField="name"
            valueField="id"
            placeholder="Select Category"
            value={taskData.category || null}
            onChange={(item) => onCategoryChange(item.id)}
          />

          {/* Start Date Picker */}
          <View>
            <Button
              title={`Start Date: ${
                taskData.start_date
                  ? new Date(taskData.start_date).toLocaleString()
                  : "Select Date"
              }`}
              onPress={() => setStartDatePickerVisibility(true)}
            />
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              onConfirm={(date) => handleDateConfirm(date, "start_date")}
              onCancel={() => setStartDatePickerVisibility(false)}
            />
          </View>

          {/* Due Date Picker */}
          <View style={{ marginTop: 10 }}>
            <Button
              title={`Due Date: ${
                taskData.due_date
                  ? new Date(taskData.due_date).toLocaleString()
                  : "Select Date"
              }`}
              onPress={() => setDueDatePickerVisibility(true)}
            />
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="datetime"
              onConfirm={(date) => handleDateConfirm(date, "due_date")}
              onCancel={() => setDueDatePickerVisibility(false)}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} />
            <Button title="Create" onPress={onSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ModalComponent;
