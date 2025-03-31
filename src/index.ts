const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");

const http = require("http");
const cors = require("cors");
const express = require("express");

const types = require("./schema");
const resolver = require("./resolvers");

const { my_instance: sq } = require("./config/db");

// manual data
// const products = [
// 	{
// 		name: "Cerveza Aguila",
// 		description: "lorem",
// 	},
// 	{
// 		name: "Cerveza Poker",
// 		description: "lorem",
// 	},
// ];

// config
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs: types,
	resolvers: resolver,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
	await server.start();
	app.use("/", cors(), express.json(), expressMiddleware(server));

	await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/`);

	sq.authenticate()
		.then(() => {
			console.log("Database connected...");
		})
		.catch((error) => {
			console.log(error);
		});
})().catch((err) => {
	console.error(err);
});
