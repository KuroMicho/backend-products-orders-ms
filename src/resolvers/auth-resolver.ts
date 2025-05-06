const authResolver = {
	Query: {
		getUserByUsername: async (_, { username }, { dataSources, sub }) => {
			if (username == sub) return await dataSources.AuthAPI.getUserByUsername(username);
			else return null;
		},
	},
	Mutation: {
		signUp: async (_, { userInput }, { dataSources }) => {
			return await dataSources.AuthAPI.signUp(userInput);
		},

		signIn: async (_, { userInput }, { dataSources }) => {
			return await dataSources.AuthAPI.signIn(userInput);
		},

		refreshToken: async (_, { refreshInput }, { dataSources }) => {
			return await dataSources.AuthAPI.refreshToken(refreshInput);
		},

		deleteUser: async (_, { username }, { dataSources, token }) => {
			if (username == token) return await dataSources.AuthAPI.deleteUser(username);
		},
	},
};

export default authResolver;
