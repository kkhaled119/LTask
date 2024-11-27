import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import ModalComponent from "../../components/modal";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
const FreeDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDelete = (task) => {
    console.log("Delete:", task);
  };

  const handleEdit = (task) => {
    console.log("Edit:", task);
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, completed: false }]);
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tasks</Text>
      </View>

      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <MenuProvider>
        <ScrollView contentContainerStyle={styles.taskList}>
          {tasks.map((item, index) => (
            <View key={index.toString()} style={styles.taskItem}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskCategory}>{item.category}</Text>
              </View>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <View style={styles.taskTimeContainer}>
                <Text style={styles.taskTime}>
                  {`(${item.startTime} - ${item.endTime})`}
                </Text>

                {/* Popup Menu */}
                <Menu>
                  {/* Trigger (Three Dots Icon) */}
                  <MenuTrigger>
                    <Text style={styles.menuTrigger}>•••</Text>
                  </MenuTrigger>
                  {/* Menu Options */}
                  <MenuOptions
                    customStyles={{
                      optionsContainer: styles.menuOptionsContainer,
                    }}
                  >
                    <MenuOption
                      onSelect={() => handleEdit(item)}
                      customStyles={{
                        optionWrapper: styles.menuOptionWrapper,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialIcons name="edit" size={20} color="#D32F2F" />
                        <TouchableOpacity>
                          <Text style={styles.menuOptionText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </MenuOption>

                    <MenuOption
                      onSelect={() => handleDelete(item)}
                      customStyles={{
                        optionWrapper: styles.menuOptionWrapper,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialIcons
                          name="delete"
                          size={20}
                          color="#D32F2F"
                        />
                        <TouchableOpacity>
                          <Text style={styles.menuOptionText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          ))}
        </ScrollView>
      </MenuProvider>

      <ModalComponent
        visible={modalVisible}
        onClose={toggleModal}
        onAddTask={addTask}
      />
    </SafeAreaView>
  );
};

export default FreeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E9",
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingVertical: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#BF3F00",
    padding: 10,
  },
  addButton: {
    paddingVertical: 10,
    backgroundColor: "#BF3F00",
    width: "30%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: "white",
  },
  taskList: {
    padding: 20,
  },
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
  taskCategory: {
    fontSize: 14,
    color: "#D97706",
    fontWeight: "bold",
    backgroundColor: "#FDF1E2",
    padding: 5,
    borderRadius: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  taskTimeContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskTime: {
    fontSize: 12,
    color: "#555",
  },
  menuTrigger: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D97706",
  },
  menuOptionsContainer: {
    padding: 5,
    backgroundColor: "#FFF6E9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuOptionWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  menuOptionText: {
    fontSize: 16,
    color: "#D32F2F",
    marginLeft: 10,
  },
});
