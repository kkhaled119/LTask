import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";

function TaskItem({ task, category, onEdit, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const toggleOptions = () => setShowOptions((prev) => !prev);

  return (
    <View style={styles.taskContainer}>
      {/* Checkbox and Task Title */}
      <View style={styles.taskHeader}>
        <CheckBox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#34D399" : "#d1d5db"}
        />
        <Text style={[styles.taskName, task.completed && styles.strikeThrough]}>
          {task.name}
        </Text>
      </View>

      {/* Task Description */}
      <Text style={styles.taskDescription}>{task.description}</Text>

      {/* Time Information (Start and End Time in One Row) */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {task.start_date
            ? `Start: ${new Date(task.start_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Start: N/A"}
        </Text>
        <Text style={styles.timeText}>
          {task.due_date
            ? `End: ${new Date(task.due_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "End: N/A"}
        </Text>
      </View>

      {/* Category Display */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>
          {category?.name || "No Category"}
        </Text>
      </View>

      {/* Options Button */}
      <TouchableOpacity onPress={toggleOptions} style={styles.optionsButton}>
        <Text style={styles.optionText}>...</Text>
      </TouchableOpacity>

      {/* Options Menu (Edit, Delete) */}
      {showOptions && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#555",
  },
  categoryContainer: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#888",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  optionsButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#007bff",
  },
  optionsMenu: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default TaskItem;
