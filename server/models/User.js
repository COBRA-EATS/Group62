const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    bio: String,
    registerDate: String,
});

module.exports = model(`User`, userSchema);