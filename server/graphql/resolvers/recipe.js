const Recipe = require('../../models/Recipe');
const { getUser } = require('../../util/authorization');
require("dotenv").config();

module.exports = {
    Query: {
        async recipe(_, {ID}) {
            try {
                const recipe = await Recipe.findById(ID);
                if (recipe) {
                    return recipe;
                } else {
                    throw new Error("Recipe not found");
                }
            } catch(err) {
                console.log(`Error: ${err}`);
            }
        }
    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name, description, ingredients, steps}}, context) {
            console.log(context.res.getOwnPropertySymbols);
            const user = await getUser(context.authorization);
            if (user) {
                try {
                    const createdRecipe = new Recipe({
                        name: name,
                        description: description,
                        createdAt: new Date().toISOString(),
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
                    throw new Error("Post creation unsuccessful");
                }
            }
        },
        async deleteRecipe(_, {ID}, context) {
            const user = getUser(context.auth);
            if (user) {
                //success if deleted=1, fail if deleted=0
                try {
                    const deleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
                    return deleted;
                } catch (err) {
                    console.log(`Error: ${err}`);
                    throw new Error("Recipe deletion unsuccessful");
                }
            }
        },
        async editRecipe(_, {ID, recipeInput: {name, description, ingredients, steps}}, context) {
            const user = getUser(context.auth);
            if (user) {
                //authorize user to edit post

                try {
                    const edited = (await Recipe.updateOne(
                    { _id: ID },
                    { name: name, description: description, ingredients: ingredients, steps: steps})).modifiedCount;
                    return edited;
                } catch(err) {
                    console.log(`Error: ${err}`);
                    throw new Error("Recipe edit unsuccessful");
                }
            }
        }
    }
}