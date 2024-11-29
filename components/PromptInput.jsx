/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const PromptInput = ({
  prompt,
  setPrompt,
  handlePromptSubmit,
  isSubmitting,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          value={prompt}
          onChangeText={(text) => setPrompt(text)}
          placeholder="Type your prompt here..."
          style={[styles.textInput, isSubmitting && styles.disabledInput]}
          onSubmitEditing={handlePromptSubmit}
          editable={!isSubmitting}
        />
        <TouchableOpacity
          onPress={handlePromptSubmit}
          disabled={isSubmitting}
          style={[
            styles.button,
            isSubmitting ? styles.disabledButton : styles.enabledButton,
          ]}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Processing..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF6E9",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  innerContainer: {
    maxWidth: 600,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BF3F00",
  },
  enabledButton: {
    backgroundColor: "#BF3F00",
  },
  disabledButton: {
    backgroundColor: "#BF3F00",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});

export default PromptInput;
