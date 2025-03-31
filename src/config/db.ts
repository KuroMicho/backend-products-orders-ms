const { Sequelize } = require("sequelize");

const my_instance = new Sequelize(
	"products_db",
	"postgres",
	"kevin",
	{
		host: "localhost",
		dialect: "postgres",
	}
);

const Products = require("../models/Products");

console.log(Products);

my_instance.sync({ force: true });

module.exports = { my_instance, Products };
