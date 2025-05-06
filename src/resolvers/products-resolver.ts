import { Product } from "../models/index";

const productsResolver = {
	Query: {
		allProducts: async (_, {}, { sub, dataSources }) => {
			await validateUser(sub, dataSources);
			return await Product.findAll();
		},

		productById: async (_, { id }, { sub, dataSources }) => {
			await validateUser(sub, dataSources);
			const product = await Product.findByPk(id);
			if (!product) throw { message: "Producto no encontrado", code: 404 };
			return product;
		},
	},

	Mutation: {
		createProduct: async (_, { data }, { sub, dataSources }) => {
			const user = await validateUser(sub, dataSources);

			try {
				return await Product.create({
					...data,
					username: user.username,
				});
			} catch (error) {
				console.error("Error creando producto:", error);
				throw {
					message: "Error al crear producto",
					code: 400,
					details: error.message,
				};
			}
		},

		updateProduct: async (_, { id, input }, { sub, dataSources }) => {
			await validateUser(sub, dataSources);

			const [affectedRows] = await Product.update(input, {
				where: { id },
			});

			if (affectedRows === 0) {
				throw { message: "Producto no encontrado", code: 404 };
			}

			return await Product.findByPk(id);
		},

		deleteProduct: async (_, { id }, { sub, dataSources }) => {
			await validateUser(sub, dataSources);

			const deleted = await Product.destroy({
				where: { id },
			});

			if (!deleted) {
				throw { message: "Producto no encontrado", code: 404 };
			}

			return { success: true, message: "Producto eliminado" };
		},
	},
};

// Helper
async function validateUser(username: string | undefined, dataSources: any) {
	if (!username) throw { message: "Autenticación requerida", code: 401 };

	try {
		const user = await dataSources.AuthAPI.getUserByUsername(username);
		if (!user) throw { message: "Usuario no autorizado", code: 403 };
		return user;
	} catch (error) {
		throw {
			message: "Error al validar usuario",
			code: error.code || 500,
			details: error.message,
		};
	}
}

export default productsResolver;
