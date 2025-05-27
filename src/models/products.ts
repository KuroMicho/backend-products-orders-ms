import { DataTypes } from "sequelize";

export default function (sequelize) {
	return sequelize.define(
		"Product",
		{
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "El nombre del producto es requerido",
					},
					len: {
						args: [2, 100],
						msg: "El nombre debe tener entre 2 y 100 caracteres",
					},
				},
			},
			description: {
				type: DataTypes.STRING(500),
				validate: {
					len: {
						args: [0, 500],
						msg: "La descripción no puede exceder los 500 caracteres",
					},
				},
			},
			username: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "El nombre de usuario es requerido",
					},
				},
			},
			image: {
				type: DataTypes.STRING(255),
				allowNull: true,
				validate: {
					isUrl: {
						msg: "La imagen debe ser una URL valida",
					},
				},
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					min: {
						args: [0],
						msg: "El precio no puede ser negativo",
					},
					max: {
						args: [9999999.99],
						msg: "El precio no puede exceder 9,999,999.99",
					},
				},
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					min: {
						args: [0],
						msg: "El stock no puede ser negativo",
					},
					isInt: {
						msg: "El stock debe ser un número entero",
					},
				},
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: {
						args: [1],
						msg: "El tamaño mínimo es 1 ml",
					},
					max: {
						args: [100000],
						msg: "El tamaño no puede exceder 100,000 ml (100L)",
					},
					isInt: {
						msg: "El tamaño debe ser un número entero de mililitros",
					},
				},
			},
		},
		{
			tableName: "products",
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ["name"],
				},
				{
					fields: ["username"],
				},
				{
					fields: ["price"],
				},
				{
					fields: ["stock"],
				},
				{
					fields: ["size"],
				},
			],
		}
	);
}
