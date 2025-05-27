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

		signOut: async (_, { usernameInput }, { dataSources }) => {
			return await dataSources.AuthAPI.signOut(usernameInput);
		},

		refreshToken: async (_, { refreshInput }, { dataSources }) => {
			return await dataSources.AuthAPI.refreshToken(refreshInput);
		},

		validateToken: async (_, { tokenInput }, { dataSources }) => {
			return await dataSources.AuthAPI.validateToken(tokenInput);
		},
	},
};

export default authResolver;
