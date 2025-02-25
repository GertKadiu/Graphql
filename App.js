import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
  Button,
  Alert,
} from "react-native";
import ListGames from "./components/ListGame";
import CreateGames from "./components/CreateGames";
import { useGameState } from "./Hook/useGameState";
import SpecificGame from "./components/SpecificGame";
import ChosenAuthor from "./components/ChosenAuthor";
import ListAthuthor from "./components/ListAthuthor";
import AvancedQuery from "./components/AvancedQuery";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "./firebase-config";

export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const takePhoto = async() => {
    try {
    const cameraResp = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })

    if (!cameraResp.canceled) {
      const {uri} = cameraResp.assets[0]
       const filename = uri.split("/").pop()
     const uploadResp =  await uploadToFirebase(uri, filename, (v) => console.log(v))
     console.log(uploadResp)
    }
  }catch (e) {
    Alert.alert("Error uploading Image" + e.message)
  }
  }

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

  if (!permission) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />

      {permission.status !== ImagePicker.PermissionStatus.GRANTED ? (
        <View style={styles.permissionContainer}>
          <Text>Permission not Granted - {permission.status}.</Text>
          <Button title="Request Permission" onPress={requestPermission} />
        </View>
      ) : (
        <>
        <View style={{marginTop:50}}>
             <Text>Working with firebase and Image Picker</Text>
             <Button title="Take picture" onPress={takePhoto} />
        </View>
     
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.error}>Error: {error.message}</Text>
          ) : (
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
          )}
        </>
      )}
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
    textAlign: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
