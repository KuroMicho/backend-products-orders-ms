const { gql } = require("graphql-tag");

const typeDefs = gql`
	type Product {
		name: String!
		description: String
	}

	type Query {
		allProducts: [Product!]!
		productById(id: ID!): Product!
	}

	input UpdateProductInput {
		name: String!
		description: String
	}

	type Mutation {
		createProduct(name: String!, description: String): Product!
		updateProduct(id: ID!, data: UpdateProductInput): [Int]!
		deleteProduct(id: ID!): Int
	}
`;

module.exports = typeDefs;
