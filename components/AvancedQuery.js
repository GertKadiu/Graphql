import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AvancedQuery({ avancedQuery }) {
  return (
    <View>
      <Text style={styles.header}>Advanced Query</Text>
      {avancedQuery?.review ? (
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewRating}>
            Title of Game: {avancedQuery.review.game?.title}
          </Text>
          <Text>
            Platform: {avancedQuery.review.game?.platform?.join(" , ")}
          </Text>
          <Text style={styles.reviewRating}>
            Rating: {avancedQuery.review?.rating} ⭐
          </Text>
          <Text style={styles.reviewRating}>
            All Ratings:
            {avancedQuery.review.game?.reviews
              ?.map((review) => `${review.rating} ⭐`)
              .join(" , ")}
          </Text>
        </View>
      ) : (
        <Text style={styles.noReviews}>No review data available</Text>
      )}
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
  reviewRating: {
    fontWeight: "bold",
    color: "#333",
  },
  reviewContent: {
    fontSize: 14,
    color: "#666",
  },
  noReviews: {
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
  },
  reviewContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
