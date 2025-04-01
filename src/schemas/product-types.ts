import { gql } from "graphql-tag";

const productTypes = gql`
	type Query {
		allProducts: [Product!]!
		productById(id: ID!): Product!
	}

	type Product {
		id: ID!
		name: String!
		description: String
		username: String!
		image: String
		price: Float!
		createdAt: String!
		updatedAt: String!
	}

	input ProductInput {
		name: String!
		description: String
		username: String!
		image: String
		price: Float!
	}


	type Mutation {
		createProduct(data: ProductInput!): Product!
		updateProduct(id: ID!, data: ProductInput!): Product!
		deleteProduct(id: ID!): Boolean!
	}
`;

export default productTypes;
