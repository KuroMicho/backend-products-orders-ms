import { sequelize } from "../config/db";

import _OrderProduct from "./orderProduct";
import _Order from "./orders";
import _Product from "./products";

const OrderProduct = _OrderProduct(sequelize);
const Product = _Product(sequelize);
const Order = _Order(sequelize);

Order.belongsToMany(Product, {
	through: OrderProduct,
	foreignKey: "orderId",
	as: "products",
});

Product.belongsToMany(Order, {
	through: OrderProduct,
	foreignKey: "productId",
	as: "orders",
});

export { OrderProduct, Product, Order };
