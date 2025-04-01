import { DataTypes } from "sequelize";

export default function (sequelize) {
	return sequelize.define(
		"Order",
		{
			productId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "El productId es requerido",
					},
				},
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "El nombre es requerido",
					},
				},
			},
			username: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "El username es requerido",
					},
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: {
						args: [0],
						msg: "La cantidad no puede ser negativa",
					},
					notNull: {
						msg: "La cantidad es requerida",
					},
				},
			},
			status: {
				type: DataTypes.ENUM("COMPLETED", "CANCELLED", "PENDING"),
				defaultValue: "PENDING",
			},
		},
		{
			tableName: "orders",
			timestamps: true,
			indexes: [
				{
					fields: ["productId"],
				},
				{
					fields: ["username"],
				},
				{
					fields: ["status"],
				},
			],
		}
	);
}
