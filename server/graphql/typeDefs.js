const { gql } = require('apollo-server')

module.exports = gql`
    ### OBJECTS ###
    type Recipe {
        name: String!
        description: String
        ingredients: [String]
        steps: [String]!
        createdAt: String!
        createdBy: String!
        likes: Int
    }
    type User {
        name: String!
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
    }

    ### INPUTS ###
    input RecipeInput {
        name: String!
        description: String
        ingredients: [String]
        steps: [String]!
    }
    input registerInput {
        name: String!
    }
`
