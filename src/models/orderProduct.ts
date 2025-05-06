import { DataTypes } from "sequelize";

export default function (sequelize) {
	return sequelize.define(
		"OrderProduct",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			unitPrice: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
		},
		{
			tableName: "order_products",
			timestamps: true,
		}
	);
}
