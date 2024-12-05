import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import ModalComponent from "./modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserTasks,
  deleteUserTask,
  editUserTask,
} from "../redux/Slices/DashboardSlice/Free-Dashboard";

function TaskList({ tasks, Categories }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskData, setTaskData] = useState(null);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  const closeModal = () => setModalVisible(false);

  const handleCategoryChange = (categoryId) => {
    setTaskData((prev) => ({ ...prev, category: categoryId }));
  };

  const handleTaskSubmit = async () => {
    await dispatch(
      editUserTask({ token, taskId: taskData.id, updatedTask: taskData })
    );
    dispatch(getUserTasks(token));
    closeModal();
  };

  const handleDelete = async (taskId) => {
    await dispatch(deleteUserTask({ token, selectedTaskId: taskId }));
    dispatch(getUserTasks(token));
  };

  const handleTaskChange = (name, value) => {
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setModalVisible(true);
  };

  if (!Categories || Categories.length === 0) {
    return (
      <Text style={styles.noTasksText}>Categories are not available.</Text>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Text style={styles.noTasksText}>
        No tasks available. Add a new task above.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        nestedScrollEnabled={true}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            category={
              Categories.find((cat) => cat.id === item.category?.id) || {
                name: "No Category",
              }
            }
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
            onToggleCompletion={() => toggleCompletion(item)}
          />
        )}
        keyExtractor={(item) => item.id?.toString() || `${Math.random()}`}
      />

      {modalVisible && (
        <ModalComponent
          visible={modalVisible}
          onClose={closeModal}
          taskData={taskData}
          onChange={handleTaskChange}
          onSubmit={handleTaskSubmit}
          onCategoryChange={handleCategoryChange}
          Categories={Categories}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5 },
  noTasksText: { textAlign: "center", fontSize: 18, color: "#6c757d" },
});

export default TaskList;
