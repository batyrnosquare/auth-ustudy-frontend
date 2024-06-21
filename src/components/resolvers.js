const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path according to your project structure

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    admins: async () => await User.find({ role: 'ADMIN' }),
    admin: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    login: async (_, { loginRequest }) => {
      const { email, password } = loginRequest;
      const user = await User.findOne({ email });
      if (!user || !(await user.isPasswordValid(password))) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });

      return {
        status: 200,
        token,
        email: user.email,
        role: user.role,
        user: user.id,
      };
    },
    register: async (_, { regRequest }) => {
      // Handle user registration
    },
    refreshToken: async (_, { refreshTokenRequest }) => {
      // Handle token refresh
    },
  },
};

module.exports = resolvers;
