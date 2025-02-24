import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useGames } from "./useGames";
import {Alert} from "react-native"

export const useGameState = () => {
  const {
    GET_GAMES,
    GET_REVIEW_ID,
    CREATE_GAMES,
    GET_AUTHORS,
    GET_CHOSEN_AUTHOR,
    AVANCED_QUERY,
    EDIT_GAME,
    DELETE_GAME
  } = useGames();

  //States
  const [newGame, setNewGame] = useState({ title: "", platform: "" });
  const [editGame, setEditGame] = useState({ id: "", title: "", platform: "" });

  // Fetch games
  const { data, loading, error } = useQuery(GET_GAMES);

  // Fetch authors
  const {
    data: authorsData,
    loading: authorsLoading,
    error: authorsError,
  } = useQuery(GET_AUTHORS);

  // Fetch specific review details
  const {
    data: reviewId,
    loading: reviewLoading,
    error: reviewError,
  } = useQuery(GET_REVIEW_ID, {
    variables: { id: "1" },
  });

  // Fetch chosen Author
  const { data: authorData } = useQuery(GET_CHOSEN_AUTHOR, {
    variables: { id: "1" },
  });

  // Advanced Query
  const { data: avancedQuery } = useQuery(AVANCED_QUERY, {
    variables: {
      id: "1",
    },
  });

  // Mutation to add a game
  const [addGame] = useMutation(CREATE_GAMES, {
    refetchQueries: [{ query: GET_GAMES }],
    onCompleted: (response) => {
        console.log("Game added sucessfully", response)
        Alert.alert(
            "Success", 
            "Game added successfully!", 
            [{ text: "OK" }]
          );
        },
  });

  // Function to handle adding a game
  const handleAddGame = () => {
    addGame({
      variables: {
        game: {
          title: newGame.title,
          platform: newGame.platform,
        },
      },
    });
    setNewGame({ title: "", platform: "" });
  };

  // Mutation to edit a game
  const [updateGame] = useMutation(EDIT_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
    onCompleted: (response) => {
        console.log("Game updated successfully:", response);
        Alert.alert(
            "Success", 
            "Game updated successfully!", 
            [{ text: "OK" }]
          );
        },
  });

  // Function to handle editing a game
  const handleEditGame = () => {
    updateGame({
      variables: {
        id: editGame.id,
        edits: {
          title: editGame.title,
          platform: editGame.platform,
        },
      },
    });
    setEditGame({ title: "", platform: "" });
  };

  // Mutation to delete a game
  const [deleteGame] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
    onCompleted: (response) => {
        console.log("Game deleted successfully", response)
        Alert.alert(
            "Success",
            "Game deleted successfully!", 
            [{ text: "OK" }]
        )
    }
  })

  // Function to handle deleting a game
  const handleDeleteGame = (id) => {
    deleteGame({
      variables: {
        id: id,
      },
    });
  };

  return {
    newGame,
    setNewGame,
    data,
    loading,
    error,
    reviewId,
    reviewLoading,
    reviewError,
    handleAddGame,
    authorsData,
    authorsLoading,
    authorsError,
    authorData,
    avancedQuery,
    handleEditGame,
    editGame,
    setEditGame,
    handleDeleteGame
  };
};
