import { sequelize } from "../config/db.js";
import _Product from "./products.js";
import _Order from "./orders.js";

const Product = _Product(sequelize);
const Order = _Order(sequelize);

Order.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(Order, { foreignKey: "productId", as: "orders" });

export { Product, Order };
