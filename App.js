import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ListGames from "./components/ListGame";
import CreateGames from "./components/CreateGames";
import { useGameState } from "./Hook/useGameState";
import SpecificGame from "./components/SpecificGame";
import ChosenAuthor from "./components/ChosenAuthor";
import ListAthuthor from "./components/ListAthuthor";
import AvancedQuery from "./components/AvancedQuery";

export default function App() {
  const {
    newGame,
    setNewGame,
    data,
    loading,
    error,
    handleAddGame,
    authorsData,
    authorData,
    avancedQuery,
    handleEditGame,
    setEditGame,
    editGame,
    handleDeleteGame,
  } = useGameState();

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <>
            <CreateGames
              value={editGame.id ? editGame : newGame}
              onChangeText={editGame.id ? setEditGame : setNewGame}
              onSubmit={editGame.id ? handleEditGame : handleAddGame}
              isEditing={!!editGame.id}
            />
            <SpecificGame />
            <Text style={styles.header}>List of Games</Text>
          </>
        }
        data={data.games}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ListGames
            game={item}
            handleDeleteGame={handleDeleteGame}
            setEditGame={setEditGame}
          />
        )}
        ListFooterComponent={
          <>
            <ListAthuthor authorsData={authorsData} />
            <ChosenAuthor authorData={authorData} />
            <AvancedQuery avancedQuery={avancedQuery} />
          </>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 50,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
