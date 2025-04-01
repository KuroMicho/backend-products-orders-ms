import { gql } from "graphql-tag";

const orderTypes = gql`
	type Order {
		id: ID!
		productId: ID!
		product: Product! # Relación con Product
		name: String!
		username: String!
		quantity: Int!
		status: OrderStatus!
		createdAt: String!
		updatedAt: String!
	}

	enum OrderStatus {
		COMPLETED
		CANCELLED
		PENDING
	}

	input OrderInput {
		productId: ID!
		name: String!
		username: String!
		quantity: Int!
		status: OrderStatus = PENDING
	}

	input UpdateOrderInput {
		productId: ID
		name: String
		username: String
		quantity: Int
		status: OrderStatus
	}

	type Query {
		# Order queries
		allOrders: [Order!]!
		orderById(id: ID!): Order
		ordersByUser(username: String!): [Order!]!
	}

	type Mutation {
		# Order mutations
		createOrder(data: OrderInput!): Order!
		updateOrder(id: ID!, data: UpdateOrderInput!): Order!
		deleteOrder(id: ID!): Boolean!
	}
`;

export default orderTypes;
