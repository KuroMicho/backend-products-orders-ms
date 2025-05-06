import { GraphQLError } from "graphql";
import fetch from "node-fetch";

import rest from "../utils/url";

interface AuthContext {
	sub: string | null;
}

const authentication = async (req: any): Promise<AuthContext> => {
	const authHeader = req.headers.authorization || "";
	const token = authHeader.replace(/^Bearer\s+/i, "").trim();
		
	if (!token) {
		return { sub: null };
	}

	try {
		const response = await fetch(`${rest.AUTH_API_URL}/api/v1/auth/validateToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token }),
		});

		if (!response.ok) {
			throw new GraphQLError("UNAUTHENTICATED", {
				extensions: {
					code: "TOKEN_VALIDATION_FAILED",
					serviceName: "auth-service",
				},
			});
		}

		const data = await response.json();
		return { sub: data.username };
	} catch (error) {
		throw new GraphQLError("Error validando el token", {
			extensions: {
				code: "TOKEN_VALIDATION_ERROR",
				serviceName: "auth-service",
				errorDetails: error.message,
			},
		});
	}
};

export default authentication;
