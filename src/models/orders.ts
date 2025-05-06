import { DataTypes } from "sequelize";

export default function (sequelize) {
	return sequelize.define(
		"Order",
		{
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
					fields: ["username"],
				},
				{
					fields: ["status"],
				},
			],
		}
	);
}
