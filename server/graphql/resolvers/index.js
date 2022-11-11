const recipeResolvers = require('./recipe');
const userResolvers = require('./user');

module.exports = {
    Query: {
        ...recipeResolvers.Query,
        ...userResolvers.Query
    },

    Mutation: {
        ...recipeResolvers.Mutation,
        ...userResolvers.Mutation
    }
};