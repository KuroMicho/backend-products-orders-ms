import { gql } from "graphql-tag";

const orderTypes = gql`
	enum OrderStatus {
		COMPLETED
		CANCELLED
		PENDING
	}

	input ProductOrderInput {
		id: ID!
		quantity: Int!
	}

	input OrderInput {
		name: String!
		products: [ProductOrderInput!]!
		status: OrderStatus
	}

	type ProductInfo {
		id: ID!
		name: String!
	}

	type Units {
		quantity: Int!
		unitPrice: Float!
		product: ProductInfo!
	}

	type Order {
		id: ID!
		name: String!
		username: String!
		status: OrderStatus!
		total: Float!
		units: [Units!]!
		createdAt: String!
		updatedAt: String!
		user: User
	}

	type User {
		id: ID!
		username: String!
		email: String
	}

	type Query {
		ordersByUsername(username: String!): [Order!]!
	}

	type Mutation {
		createOrder(data: OrderInput!): Order!
		updateOrder(id: ID!, data: OrderInput!): Order!
		deleteOrder(id: ID!): Boolean!
	}
`;

export default orderTypes;
