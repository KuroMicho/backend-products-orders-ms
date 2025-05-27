import { GraphQLError } from "graphql";

import { Order } from "../models/index";
import { Product } from "../models/index";

const ordersResolver = {
	Query: {
		ordersByUsername: async (_, { username }, { dataSources }) => {
			const user = await dataSources.AuthAPI.getUserByUsername(username);
			if (!user) throw new Error("Usuario no encontrado");
			return await Order.findAll({ where: { username } });
		},
	},
	Mutation: {
		createOrder: async (_, { data }, { sub }) => {
			try {
				for (const item of data.products) {
					const product = await Product.findByPk(item.id);

					if (!product) {
						throw new Error(`Producto con ID ${item.id} no encontrado.`);
					}

					if (product.stock < item.quantity) {
						throw new Error(
							`No hay suficiente stock para el producto ${product.name}. Cantidad disponible: ${product.stock}`
						);
					}
				}

				const order = await Order.create({
					...data,
					username: sub,
				});

				for (const item of data.products) {
					const product = await Product.findByPk(item.id);

					await order.addProduct(product, {
						through: {
							quantity: item.quantity,
							unitPrice: product.price,
						},
					});

					await product.update({ stock: product.stock - item.quantity });
				}

				return await Order.findByPk(order.id);
			} catch (error) {
				throw new GraphQLError(`Error al crear orden: ${error.message}`);
			}
		},

		deleteOrder: async (_, { id }) => {
			const deletedCount = await Order.destroy({
				where: { id },
			});
			return deletedCount > 0;
		},
	},

	Order: {
		user: async (order, _, { dataSources }) => {
			return await dataSources.AuthAPI.getUserByUsername(order.username);
		},

		units: async (order) => {
			const items = await order.getProducts({
				attributes: ["id", "name"],
				joinTableAttributes: ["quantity", "unitPrice"],
			});

			return items.map((item) => ({
				quantity: item.OrderProduct.quantity,
				unitPrice: item.OrderProduct.unitPrice,
				product: {
					id: item.id,
					name: item.name,
				},
			}));
		},

		total: async (order) => {
			const items = await order.getProducts({
				attributes: [],
				joinTableAttributes: ["quantity", "unitPrice"],
			});
			return items.reduce(
				(sum, item) => sum + item.OrderProduct.quantity * item.OrderProduct.unitPrice,
				0
			);
		},
	},
};

export default ordersResolver;
