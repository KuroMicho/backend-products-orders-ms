import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Verificación de variables de entorno
const databaseUrl =
	process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DATABASE_TEST_URL;

if (!databaseUrl) {
	throw new Error("Database URL is not defined in environment variables");
}

const sequelize = new Sequelize(databaseUrl, {
	dialect: "postgres",
	dialectOptions: {
		ssl:
			process.env.NODE_ENV === "production"
				? {
						rejectUnauthorized: false,
				  }
				: false,
	},
	logging: console.log,
});

export { sequelize };
