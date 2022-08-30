import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      highscores {
        _id
        score
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query oneUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      highscores {
        _id
        score
        createdAt
      }
    }
  }
`;

export const QUERY_HIGHSCORES = gql`
  query allHighscores {
    highscores {
      _id
      score
      createdAt
    }
  }
`;

export const QUERY_SINGLE_HIGHSCORE = gql`
  query oneHighscore($highscoreId: ID!) {
    highscore(highscoreId: $highscoreId) {
      _id
      score
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      highscores {
        _id
        score
        createdAt
      }
    }
  }
`;
