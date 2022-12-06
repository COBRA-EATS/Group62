const { gql } = require('apollo-server')

module.exports = gql`
    ### OBJECTS ###
    type Recipe {
        id: ID!
        name: String!
        description: String
        ingredients: [String]
        steps: [String]!
        createdAt: String!
        createdBy: String!
        likes: Int
    }
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        password: String!
        firstName: String!
        lastName: String!
        bio: String
        registerDate: String!
    }
    ### QUERIES ###
    type Query {
        recipe(ID: ID!): Recipe
        user(ID: ID!): User
    }
    ### MUTATIONS ###
    type Mutation {
        createRecipe(recipeInput: RecipeInput): Recipe
        deleteRecipe(ID: ID!): Boolean!
        editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean!
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
    }
    ### INPUTS ###
    input RecipeInput {
        name: String!
        description: String
        ingredients: [String]
        steps: [String]!
    }
    input RegisterInput {
        username: String!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        confirmPassword: String!
    }
`