const { AuthenticationError } = require('apollo-server');
const Recipe = require('../../models/Recipe');
const { getUser } = require('../../util/authorization');
require('dotenv').config();

module.exports =  {
    Query: {
        async recipe(_, {ID}) {
            try {
                const recipe = await Recipe.findById(ID);
                if (recipe) {
                    return recipe;
                } else {
                    throw new Error('Recipe not found');
                }
            } catch(err) {
                console.log(`Error: ${err}`);
            }
        },
        async feed(_) {
            try {
                const feed = await Recipe.find().sort( { createdAt: -1});
                return feed;
            } catch(err) {
                console.log(`Error: ${err}`);
            }
        },
        async searchRecipe(_, {keywords}) {
            try {
                if (!keywords || keywords.length === 0)
                    throw new Error('Search cannot be empty');
                const recipes = await Recipe.find({$text: { $search: keywords}});
                return recipes;
            } catch(err) {
                throw new Error(`Error: ${err}`);
            }
        }
    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name, description, ingredients, steps}}, context) {
            const user = await getUser(context);
            console.log(user);
            if (user) {
                try {
                    const createdRecipe = new Recipe({
                        name: name,
                        description: description,
                        createdAt: new Date().toISOString(),
                        createdBy: user.username,
                        ingredients: ingredients,
                        steps: steps,
                        likes: 0
                    })

                    const res = await createdRecipe.save();

                    return {
                        id: res.id,
                        ...res._doc
                    }
                } catch(err) {
                    console.log(err);
                    throw new Error('Post creation unsuccessful');
                }
            }
        },
        async deleteRecipe(_, {ID}, context) {
            const user = await getUser(context);
            if (user) {
                //success if deleted=1, fail if deleted=0
                try {
                    const deleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
                    return deleted;
                } catch (err) {
                    console.log(`Error: ${err}`);
                    throw new Error('Recipe deletion unsuccessful');
                }
            }
        },
        async editRecipe(_, {ID, recipeInput: {name, description, ingredients, steps}}, context) {
            const user = await getUser(context);
            if (user) {
                //authorize user to edit post
                const recipe = await Recipe.findOne({_id: ID});

                if(!recipe) {
                    throw new Error('Recipe not found');
                }
                if (user.id != recipe.createdBy.toString())
                    throw new AuthenticationError('You do not have permission to edit this recipe!');
                try {
                    const edited = (await Recipe.updateOne(
                    { _id: ID },
                    { name: name, description: description, ingredients: ingredients, steps: steps})).modifiedCount;
                    return edited;
                } catch(err) {
                    console.log(`Error: ${err}`);
                    throw new Error('Recipe edit unsuccessful');
                }
            }
        }
    }
}