import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";

import { sequelize } from "./config/db";
import { AuthAPI } from "./data/auth-api";
import resolvers from "./resolvers/index";
import typeDefs from "./schemas/index";
import authentication from "./utils/authentication";

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

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

(async () => {
	await server.start();

	app.use(
		"/graphql",
		cors(corsOptions),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const { sub } = await authentication(req);
				const { cache } = server;
				return {
					sub,
					dataSources: {
						AuthAPI: new AuthAPI({ token: sub, cache }),
					},
				};
			},
		}) as unknown as express.RequestHandler
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
