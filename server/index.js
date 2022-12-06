const mongoose = require('mongoose');
const { ApolloServer } = require( 'apollo-server');

require("dotenv").config();

const port = process.env.PORT || 5000;

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log("MongoDB connected successfully");
      return server.listen({port});
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
  .catch((error) => console.log(`${error} did not connect`));