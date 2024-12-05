import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function EditTaskModal({ visible, taskData, onClose, onTaskUpdated }) {
  const [task, setTask] = useState(taskData);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  useEffect(() => {
    if (taskData !== task) {
      setTask(taskData);
    }
  }, [taskData]);

  const handleUpdate = () => {
    onTaskUpdated(task);
    onClose();
  };

  const handleStartDateConfirm = (date) => {
    setTask({ ...task, startDate: date });
    setStartDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setTask({ ...task, endDate: date });
    setEndDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setStartDatePickerVisible(false);
    setEndDatePickerVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalTitle}>Edit Task</Text>

            {/* Edit Task Name */}
            <Text style={styles.label}>Task Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Task Name"
              value={task.name}
              onChangeText={(text) => setTask({ ...task, name: text })}
            />

            {/* Edit Task Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter Description"
              value={task.description}
              onChangeText={(text) => setTask({ ...task, description: text })}
              multiline
            />

            {/* Edit Task Category */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={task.category}
                onValueChange={(itemValue) =>
                  setTask({ ...task, category: itemValue })
                }
              >
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Personal" value="personal" />
                <Picker.Item label="Urgent" value="urgent" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            {/* Edit Task Start Date */}
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              onPress={() => setStartDatePickerVisible(true)}
              style={styles.input}
            >
              <Text style={{ color: "#333" }}>
                {task.startDate
                  ? task.startDate.toLocaleString()
                  : "Select Start Date"}
              </Text>
            </TouchableOpacity>

            {/* Edit Task End Date */}
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              onPress={() => setEndDatePickerVisible(true)}
              style={styles.input}
            >
              <Text style={{ color: "#333" }}>
                {task.endDate
                  ? task.endDate.toLocaleString()
                  : "Select End Date"}
              </Text>
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Start Date Picker */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={handleDateCancel}
      />

      {/* End Date Picker */}
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="datetime"
        onConfirm={handleEndDateConfirm}
        onCancel={handleDateCancel}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 8,
  },
  cancelButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default EditTaskModal;
