import { gql } from "graphql-tag";

const productTypes = gql`
	input ProductInput {
		name: String!
		description: String
		username: String!
		image: String
		price: Float!
		stock: Int!
		size: Int!
	}

	type Product {
		id: ID
		name: String!
		description: String
		username: String!
		image: String
		price: Float!
		stock: Int!
		size: Int!
		createdAt: String!
		updatedAt: String!
	}

	type Deleted {
		success: String!
		message: String!
	}

	type Query {
		allProducts: [Product!]!
		productById(id: ID!): Product!
	}

	type Mutation {
		createProduct(data: ProductInput!): Product!
		updateProduct(id: ID!, data: ProductInput!): Product!
		deleteProduct(id: ID!): Deleted!
	}
`;

export default productTypes;
