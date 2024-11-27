import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDF6EC" }}>
      {tasks.map((item, index) => (
        <View key={index.toString()} style={styles.taskItem}>
          <View style={styles.taskHeader}></View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#D97706",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  taskTimeContainer: {
    marginTop: 10,
  },
  taskTime: {
    fontSize: 12,
    color: "#555",
  },
  menuTrigger: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default TaskList;
