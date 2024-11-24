import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropdownComponent from "./ DropdownComponent";

const ModalComponent = ({ visible, onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [isStartTimePicker, setIsStartTimePicker] = useState(true);

  // State to manage dropdown value
  const [dropdownValue, setDropdownValue] = useState(null);

  const dropdownData = [
    { label: "Sports", value: "Sports", icon: "smileo" },
    { label: "Home", value: "Home" },
    { label: "Work", value: "Work" },
    { label: "Grocery", value: "Grocery" },
    { label: "Other", value: "Other" },
  ];

  const handleCreate = () => {
    console.log(
      "Task Created:",
      taskTitle,
      taskDescription,
      selectedStartTime,
      selectedEndTime,
      dropdownValue
    );
    onClose();
  };

  const showDatePicker = (isStart) => {
    setIsStartTimePicker(isStart);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (isStartTimePicker) {
      setSelectedStartTime(formattedTime);
    } else {
      setSelectedEndTime(formattedTime);
    }
    hideDatePicker();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Title"
            placeholderTextColor="#ccc"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            placeholderTextColor="#ccc"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />

          <View style={styles.row}>
            <TextInput
              style={styles.inputDate}
              placeholder="Start Time"
              placeholderTextColor="black"
              value={selectedStartTime}
              editable={false}
            />
            <TouchableOpacity onPress={() => showDatePicker(true)}>
              <AntDesign name="clockcircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={styles.inputDate}
              placeholder="End Time"
              placeholderTextColor="black"
              value={selectedEndTime}
              editable={false}
            />
            <TouchableOpacity onPress={() => showDatePicker(false)}>
              <AntDesign name="clockcircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Dropdown Component */}
          <DropdownComponent
            value={dropdownValue}
            setValue={setDropdownValue}
            data={dropdownData}
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
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
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#BF3F00",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  inputDate: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  createButton: {
    backgroundColor: "#BF3F00",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
  },
  createButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#FFF6E9",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#BF3F00",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ModalComponent;
