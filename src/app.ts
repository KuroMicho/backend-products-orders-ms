// npm install @apollo/server express graphql cors
import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";

import { sequelize } from "./config/db";
import resolvers from "./resolvers/index";
import typeDefs from "./schemas/index";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function initializeDB() {
	try {
		await sequelize.sync();
		console.log("✅ DB synchronized");
	} catch (error) {
		console.error("❌ DB sync failed:", error);
	}
}

initializeDB();

(async () => {
	await server.start();

	app.use(
		"/graphql",
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => ({ req }),
		}) as unknown as express.RequestHandler
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
