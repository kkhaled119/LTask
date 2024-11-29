import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatusMessages = ({
  loading,
  error,
  currentResponse,
  retryCount,
  responseId,
  MAX_RETRIES,
}) => {
  return (
    <>
      {loading && (
        <View style={[styles.messageContainer, styles.loadingContainer]}>
          <Text style={styles.loadingText}>
            {retryCount > 0
              ? `Checking for new tasks (Attempt ${retryCount}/${MAX_RETRIES})...`
              : "Processing your request..."}
          </Text>
        </View>
      )}

      {error && (
        <View style={[styles.messageContainer, styles.errorContainer]}>
          <Text style={styles.errorText}>
            {typeof error === "string" ? error : "An error occurred"}
          </Text>
        </View>
      )}

      {currentResponse && (
        <View
          key={responseId}
          style={[styles.messageContainer, styles.responseContainer]}
        >
          <Text style={styles.responseHeader}>AI Response:</Text>
          <Text style={styles.responseText}>
            {typeof currentResponse === "string"
              ? currentResponse
              : currentResponse?.message || "Processing complete"}
          </Text>
        </View>
      )}
    </>
  );
};

export default StatusMessages;

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  loadingContainer: {
    backgroundColor: "#EBF8FF",
  },
  loadingText: {
    color: "#3182CE",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
  },
  errorText: {
    color: "#DC2626",
  },
  responseContainer: {
    backgroundColor: "#D1FAE5",
  },
  responseHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#065F46",
  },
  responseText: {
    color: "#065F46",
  },
});
