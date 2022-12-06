const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    bio: String,
    registerDate: String,
});

module.exports = model(`User`, userSchema);