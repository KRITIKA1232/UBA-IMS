// import {gql} from 'graphql-tag';

// export const typeDefs = gql`
//     type User {
//         fname: String!
//         lname: String!
//     }
    
//     type Query {
//         getAllUsers: [User!]!
//         getUser(fname: String!): User
//         getUserByFullName(fullname: String!): User
//     }
    
//     type Mutation {
//         createUser(fname: String!, lname: String!): User!
//         deleteUser(fname: String!): MessageResponse!
//         updateUser(fullname: String!, newfname: String!, newlname: String!): User!
//     }

//     type MessageResponse {
//         message: String!
//     }
//     `;

import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type User {
        id: ID!
        fname: String!
        lname: String!
        createdAt: String
        updatedAt: String
    }

    type MessageResponse {
        message: String!
    }

    type Query {
        getAllUsers: [User!]!
        getUser(fname: String!): User!
    }

    type Mutation {
        createUser(fname: String!, lname: String!): User!
        deleteUser(fname: String!): MessageResponse!
        updateUser(fullname: String!, newfname: String!, newlname: String!): User!
    }
`;
