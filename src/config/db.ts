import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
	process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DATABASE_TEST_URL,
	{
		dialect: "postgres",
		dialectOptions: {
			ssl: false,
			connectTimeout: 5000,
		},
		logging: console.log,
	}
);

export { sequelize };
