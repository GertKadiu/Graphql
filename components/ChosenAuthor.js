import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

export default function ChosenAuthor({ authorData }) {
  return (
    <View>
      <Text style={styles.header}>Chosen Author</Text>
      {authorData?.author ? (
        <>
          <Text style={styles.title}>{authorData.author.name}</Text>
          {authorData.author.reviews?.length > 0 ? (
            <FlatList
              data={authorData.author.reviews}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewRating}>
                    Rating: {item.rating} ⭐
                  </Text>
                  <Text style={styles.reviewContent}>
                    Content: {item.content}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noReviews}>No reviews available</Text>
          )}
        </>
      ) : (
        <Text style={styles.noReviews}>No author data available</Text>
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
  title: {
    textTransform: "capitalize",
    fontWeight: "bold",
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
