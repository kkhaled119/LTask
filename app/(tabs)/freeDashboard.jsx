import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ModalComponent from "../../components/modal";
import { useSelector, useDispatch } from "react-redux";
import {
  createTask,
  getUserTasks,
} from "../../redux/Slices/DashboardSlice/Free-Dashboard";
import CategoryList, {
  DailogCategories,
} from "../../components/ DailogCategories";
import TaskList from "../../components/TaskList";

const { width, height } = Dimensions.get("window");

const FreeDashboard = () => {
  const [modelVisable, setModalVisible] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    category: "",
    start_date: "",
    due_date: "",
  });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const { tasks, loading } = useSelector((state) => state.freedashboard);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleChange = (field, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleAddTask = async () => {
    if (!taskData.name.trim() || !taskData.description.trim()) {
      console.log("Please provide task name and description");
      return;
    }

    if (!taskData.start_date || !taskData.due_date) {
      console.log("Please select start and due dates");
      return;
    }

    try {
      const formattedStartDate = formatDate(taskData.start_date);
      const formattedDueDate = formatDate(taskData.due_date);

      const updatedTaskData = {
        ...taskData,
        start_date: formattedStartDate,
        due_date: formattedDueDate,
      };

      await dispatch(createTask({ formData: updatedTaskData, token })).unwrap();

      // Reset form data
      setTaskData({
        name: "",
        description: "",
        start_date: "",
        due_date: "",
        category: "",
      });
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleCategoryChange = (id) => {
    console.log("Selected Category ID:", id);
    setTaskData({ ...taskData, category: id });
  };

  useEffect(() => {
    dispatch(getUserTasks(token));
    console.log("Tasks after fetching:", tasks);
  }, [dispatch, token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF6E9" }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TaskList
          tasks={tasks}
          Categories={DailogCategories}
          taskData={taskData}
          onChange={handleChange}
          onSubmit={handleAddTask}
          style={styles.taskList}
          nestedScrollEnabled={true}
        />
        <View style={styles.addTaskContainer}>
          <TouchableOpacity onPress={openModal} style={styles.addTaskButton}>
            <Text style={styles.addTaskButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalComponent
        isVisible={modelVisable}
        onClose={closeModal}
        taskData={taskData}
        onChange={handleChange}
        onSubmit={handleAddTask}
        onCategoryChange={handleCategoryChange}
        Categories={DailogCategories}
      />
    </SafeAreaView>
  );
};

export default FreeDashboard;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: width * 0.05,
  },
  taskList: {
    marginBottom: height * 0.05, // مسافة بين قائمة المهام والزر
  },
  addTaskContainer: {
    padding: width * 0.05,
    justifyContent: "flex-end", // وضع الزر في أسفل الصفحة
    alignItems: "flex-start", // أو يمكن ضبطه على `center` لتوسيط الزر في الجهة اليسرى
  },
  addTaskButton: {
    backgroundColor: "#BF3F00",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    alignItems: "center",
  },
  addTaskButtonText: {
    color: "white",
    fontSize: width * 0.04,
  },
});
