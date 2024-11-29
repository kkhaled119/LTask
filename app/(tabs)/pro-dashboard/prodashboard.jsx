import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import ProTaskList from "../../../components/ProTaskList";
import PromptInput from "../../../components/PromptInput";
import StatusMessages from "../../../components/StatusMessages";
import { addPrompt } from "../../../redux/Slices/DashboardSlice/Pro-Dashboard";

const ProDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, tasks, status, chatbotResponse } = useSelector(
    (state) => state.prodashboard
  );
  const token = useSelector((state) => state.login.token);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    setIsSubmitting(true);

    try {
      await dispatch(addPrompt({ token, prompt })).unwrap();
    } catch (err) {
      console.error("Error during prompt submission:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.mainContent, isSidebarOpen && styles.sidebarOpen]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <Text style={styles.headerText}>
              Tasks with AI{" "}
              <MaterialIcons name="auto-awesome" size={24} color="#000" />
            </Text>

            {/* Status Messages */}
            <StatusMessages
              loading={loading}
              error={error}
              currentResponse={status}
            />

            {/* Chatbot Response */}
            {chatbotResponse && (
              <View style={styles.chatbotResponse}>
                <Text style={styles.chatbotResponseText}>
                  {chatbotResponse}
                </Text>
              </View>
            )}

            {/* Task List */}
            <ProTaskList tasks={tasks} loading={loading} />
          </ScrollView>

          {/* Prompt Input */}
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            handlePromptSubmit={handlePromptSubmit}
            isSubmitting={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF6E9",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF6E9",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  sidebarOpen: {
    marginLeft: 0,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  chatbotResponse: {
    backgroundColor: "#E8F0FE",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  chatbotResponseText: {
    color: "#1E88E5",
    fontWeight: "bold",
  },
  promptInput: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
