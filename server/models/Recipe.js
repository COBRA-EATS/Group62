const { model, Schema } = require('mongoose');

const recipeSchema = new Schema({
    name: String,
    description: String,
    ingredients: String,
    steps: String,
    likes: Number,
    createdAt: String,
    createdBy: Schema.Types.ObjectId
});
recipeSchema.index( { name : "text", description: "text", ingredients: "text"},
    {weights: {
        name: 10,
        description: 5,
        ingredients: 1
    }} );
module.exports = model(`Recipe`, recipeSchema);