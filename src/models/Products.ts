const { DataTypes } = require("sequelize");
const { my_instance: sequelize } = require("../config/db");

const Product = sequelize.define(
	"Product",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		description: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Product;
