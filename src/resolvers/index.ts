const Pd = require("../models/Products");

const resolvers = {
	Query: {
		allProducts: async () => await Pd.findAll(),
		productById: async (_, { id }) => {
			const product = await Pd.findOne({ where: { id } });
			return product;
		},
	},
	Mutation: {
		createProduct: async (_, { name, description }) => {
			const product = await Pd.create({ name, description });
			return product;
		},
		updateProduct: async (_, { id, data }) => {
			const product = await Pd.update(
				{ name: data.name, description: data.description },
				{
					where: {
						id,
					},
				}
			);
			return product;
		},
		deleteProduct: async (_, { id }) => {
			const product = await Pd.destroy({
				where: {
					id,
				},
			});
			return product;
		},
	},
};

module.exports = resolvers;
