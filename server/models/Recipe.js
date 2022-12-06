const { model, Schema } = require('mongoose');

const recipeSchema = new Schema({
    name: String,
    description: String,
    ingredients: String,
    steps: String,
    likes: Number,
    createdAt: String,
    createdBy: String
});

module.exports = model(`Recipe`, recipeSchema);