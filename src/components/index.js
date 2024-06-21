const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs'); // Adjust the path if necessary
const resolvers = require('./schema/resolvers'); // Adjust the path if necessary
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path if necessary

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, 'YOUR_SECRET_KEY');
    }
    return null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
