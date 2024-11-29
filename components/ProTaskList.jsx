/* eslint-disable react/prop-types */
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";

const ProTaskList = ({ tasks, loading }) => {
  console.log("Tasks From TaskList", tasks);
  console.log("Loading From Tasklist", loading);

  if (loading) {
    return <Text style={styles.loadingText}>Loading tasks...</Text>;
  }

  if (!tasks.length) {
    return <Text style={styles.noTasksText}>No tasks available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tasks:</Text>
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <Checkbox style={styles.checkbox} />
          <View>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
            <Text style={styles.taskDate}>
              Start: {new Date(task.start_date).toLocaleString()}
            </Text>
            <Text style={styles.taskDate}>
              End: {new Date(task.end_date).toLocaleString()}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFF6E9",
    borderRadius: 8,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
  },
  taskDescription: {
    fontSize: 14,
    color: "#555555",
    marginVertical: 4,
  },
  taskDate: {
    fontSize: 12,
    color: "#888888",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555555",
    marginTop: 16,
  },
  noTasksText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888888",
    marginTop: 16,
  },
});

export default ProTaskList;
