import { Product } from "../models/index.js";

const productsResolver = {
	Query: {
		allProducts: async () => await Product.findAll(),
		productById: async (_, { id }) => {
			const pd = await Product.findByPk(id);
			return pd;
		},
	},
	Mutation: {
		createProduct: async (_, { data }) => {
			const pd = await Product.create(data);
			return pd;
		},
		updateProduct: async (_, { id, data }) => {
			const pd = await Product.update(data, {
				where: {
					id,
				},
			});
			return pd;
		},
		deleteProduct: async (_, { id }) => {
			const pd = await Product.destroy({
				where: {
					id,
				},
			});
			return pd;
		},
	},
};

export default productsResolver;
