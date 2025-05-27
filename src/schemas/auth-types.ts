import { gql } from "graphql-tag";

const authTypes = gql`
	input SignUp {
		username: String!
		email: String!
		password: String!
	}

	input SignIn {
		username: String!
		password: String!
	}

	input Token {
		token: String!
	}

	input Username {
		username: String!
	}

	input Refresh {
		refreshToken: String!
	}

	type SignInResponse {
		refreshToken: String!
		token: String!
	}

	type ValidateTokenResponse {
		isValid: Boolean
		username: String
	}

	type RefreshTokenResponse {
		accessToken: String!
		refreshToken: String!
		tokenType: String!
	}

	type SignUpResponse {
		message: String!
	}

	type SignOutResponse {
		message: String!
	}

	type UserDetails {
		id: String!
		username: String!
		email: String!
	}

	type Query {
		getUserByUsername(username: String!): UserDetails
	}

	type Mutation {
		signUp(userInput: SignUp): SignUpResponse!
		signIn(userInput: SignIn): SignInResponse!
		refreshToken(refreshInput: Refresh!): RefreshTokenResponse!
		validateToken(tokenInput: Token!): ValidateTokenResponse!
		signOut(usernameInput: Username!): SignOutResponse!
	}
`;

export default authTypes;
