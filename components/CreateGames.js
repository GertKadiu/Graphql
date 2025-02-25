import React from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import {useWindowDimensions} from "react-native"

export default function CreateGames({
  onChangeText,
  value,
  onSubmit,
  isEditing,
})
 {

    const {width} = useWindowDimensions();

     const inputWidth = width * 0.8;

  return (
    <View>
      <Text style={styles.header}>
        {isEditing ? "Edit Game" : "Create Game"}
      </Text>
      <View style={styles.inputCtn}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter game title"
          value={value.title}
          onChangeText={(text) => onChangeText({ ...value, title: text })}
        />
        <TextInput
          style={[styles.textInput, {width: inputWidth}]}
          placeholder="Enter game Platform"
          value={value.platform}
          onChangeText={(text) => onChangeText({ ...value, platform: text })}
        />
        <Button
          onPress={onSubmit}
          title={isEditing ? "Edit Game" : "Add Game"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputCtn: {
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    paddingVertical: 10,
    borderRadius: 8,
    padding: 8,
  },
});
