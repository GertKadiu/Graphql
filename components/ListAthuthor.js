import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ListAthuthor({ authorsData }) {
  return (
    <View>
      <Text style={styles.header}>List of Authors</Text>
      {authorsData?.authors?.length ? (
        <FlatList
          data={authorsData.authors}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.dataCtn}>
              <Text style={styles.title}>{item.name}</Text>
              <Text
                style={item.verified ? styles.verified : styles.notVerified}
              >
                {item.verified ? "Verified" : "Not Verified"}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviews}>No authors available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dataCtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  verified: {
    color: "green",
  },
  notVerified: {
    color: "red",
  },
  title: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});
