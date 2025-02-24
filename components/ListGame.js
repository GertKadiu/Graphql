import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const ListGames = ({ game, setEditGame, handleDeleteGame }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{game.title}</Text>
      <Text>Platform: {game.platform.join(" , ")}</Text>
      <Button
        title="Edit"
        onPress={() => {
          console.log(game);
          setEditGame({
            id: game.id,
            title: game.title,
            platform: game.platform.join(", "),
          });
        }}
      />
      <Button title="Delete" onPress={() => handleDeleteGame(game.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ListGames;
