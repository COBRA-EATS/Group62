const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {validateRegisterInput,validateLoginInput} = require('../../util/validators');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

function createToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,

    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_, {email, password}) {
            const {errors, valid} = validateLoginInput(email, password);

            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.findOne({email});

            if (!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors})
            }

            const found = await bcrypt.compare(password, user.password);
            if (!found) {
                errors.general = 'Incorrect Password';
                throw new UserInputError('Incorrect Password', {errors})
            }

            const token = createToken(user);

            return {
                ...user._doc,
                id: user.id,
                token
            };

        },
        async register(
            _,
            {
                registerInput: {username, email, password, firstName, lastName, confirmPassword}
            },
            ){
            //TODO: Validate User Data
            const { valid, errors } = validateRegisterInput(username, email, password, firstName, lastName, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            //TODO: Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            //Make sure email is not already in use
            const emailInUse = await User.findOne({ email });
            if (emailInUse) {
                throw new UserInputError('Email is already in use', {
                    errors: {
                        email: 'Email is already in use'
                        }
                    })
            }

            //hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                email,
                password,
                firstName,
                lastName,
                registerDate: new Date(),
            });
            const res = await newUser.save();
                
            const token = createToken(res);

            return {
                ...res._doc,
                id: res.id,
                token
            };
        }
    },
    Query: {
        async user(_, { ID }) {
            try {
                const user = await User.findById(ID, { password: 0});
                if (user)
                    return user;
                else
                    throw new Error('User not found');
            } catch(err) {
                throw new Error('Error: ' + err);
            }
        }
    }
    
}