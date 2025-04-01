// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import { sequelize } from "./config/db.js";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
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
