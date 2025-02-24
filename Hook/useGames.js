import { gql } from "@apollo/client";

export const useGames = () => {
  const GET_GAMES = gql`
    query GamesQuery {
      games {
        id
        title
        platform
      }
    }
  `;

  const GET_AUTHORS = gql`
    query AuthorsQuery {
      authors {
        id
        name
        verified
      }
    }
  `;

  const GET_CHOSEN_AUTHOR = gql`
    query AuthorQuery($id: ID!) {
      author(id: $id) {
        name
        reviews {
          rating
          content
        }
      }
    }
  `;

  const AVANCED_QUERY = gql`
    query ReviewQuery($id: ID!) {
      review(id: $id) {
        rating
        game {
          title
          platform
          reviews {
            rating
          }
        }
      }
    }
  `;

  const GET_REVIEW_ID = gql`
    query ReviewQuery($id: ID!) {
      review(id: $id) {
        rating
        game {
          title
          platform
          reviews {
            rating
          }
        }
      }
    }
  `;

  const CREATE_GAMES = gql`
    mutation AddGame($game: AddGameInput!) {
      addGame(game: $game) {
        id
        title
        platform
      }
    }
  `;

  const EDIT_GAME = gql`
    mutation editMutation($edits: EditGameInput!, $id: ID!) {
      updateGame(edits: $edits, id: $id) {
        id
        title
        platform
      }
    }
  `;

  const DELETE_GAME = gql`
    mutation deleteGame($id: ID!) {
      deleteGame(id: $id) {
        id
        title
        platform
      }
    }
  `;

  return {
    GET_GAMES,
    GET_REVIEW_ID,
    CREATE_GAMES,
    GET_AUTHORS,
    GET_CHOSEN_AUTHOR,
    AVANCED_QUERY,
    EDIT_GAME,
    DELETE_GAME
  };
};
