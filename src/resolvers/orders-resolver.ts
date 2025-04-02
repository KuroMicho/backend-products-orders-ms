import { Order } from "../models/index";
import { Product } from "../models/index";

const ordersResolver = {
	Query: {
		allOrders: async () => {
			const orders = await Order.findAll({
				include: [
					{
						model: Product,
						as: "product",
					},
				],
			});
			return orders;
		},
		orderById: async (_, { id }) => {
			return await Order.findByPk(id);
		},
	},
	Mutation: {
		createOrder: async (_, { data }) => {
			return await Order.create(data);
		},
		updateOrder: async (_, { id, data }) => {
			const [affectedCount] = await Order.update(data, {
				where: { id },
			});
			if (affectedCount > 0) {
				return await Order.findByPk(id);
			}
			return null;
		},
		deleteOrder: async (_, { id }) => {
			const deletedCount = await Order.destroy({
				where: { id },
			});
			return deletedCount > 0;
		},
	},

	Order: {
		// Ejemplo: products: (order) => order.getProducts()
	},
};

export default ordersResolver;
