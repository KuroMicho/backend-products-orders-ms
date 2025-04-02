import { sequelize } from "../config/db";

import _Order from "./orders";
import _Product from "./products";

const Product = _Product(sequelize);
const Order = _Order(sequelize);

Order.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(Order, { foreignKey: "productId", as: "orders" });

export { Product, Order };
