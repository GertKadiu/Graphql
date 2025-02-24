import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGameState } from "../Hook/useGameState";

export default function SpecificGame() {
  const { reviewId, reviewError, reviewLoading } = useGameState();

  if (reviewLoading) return <Text>Loading...</Text>;
  if (reviewError) return <Text>Error: {reviewError.message}</Text>;

  return (
    <View>
      <Text style={styles.header}>Specific game</Text>
      <Text>Title: {reviewId.review.game.title}</Text>
      {reviewId?.review?.game?.reviews?.map((r, index) => (
        <Text key={index}>Rating: {r.rating}</Text>
      ))}
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
