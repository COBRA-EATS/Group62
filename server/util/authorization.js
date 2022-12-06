const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

module.exports.getUser = async auth => {
    if (!auth) {
        throw new AuthenticationError('You must be logged in to complete this action!');
    }

    const token = auth.split('Bearer ')[1];
    if (!token) {
        throw new AuthenticationError('Token must be provided.');
    }

    const user = await jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) throw new AuthenticationError('Invalid token');
        return decoded;
    });

    return user;
}