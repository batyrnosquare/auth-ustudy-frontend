import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($email: String!) {
    user(email: $email) {
      firstName
      lastName
      email
      role
    }
  }
`;


export const LOGIN_USER = gql`
  mutation login($loginRequest: LoginInput!) {
    login(loginRequest: $loginRequest) {
      status
      token
      email
      role
      user
    }
  }
`;

