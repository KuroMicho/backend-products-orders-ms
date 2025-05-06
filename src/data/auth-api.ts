import type { AugmentedRequest } from "@apollo/datasource-rest";
import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

import rest from "../utils/url";

export class AuthAPI extends RESTDataSource {
	override baseURL?: string = rest.AUTH_API_URL;
	private token: string;

	constructor(options: { token: any; cache: KeyValueCache }) {
		super(options);
		this.token = options.token;
	}

	override willSendRequest(_path: string, request: AugmentedRequest) {
		if (this.token) {
			request.headers["Authorization"] = `Bearer ${this.token}`;
		}		
		request.headers["Content-Type"] = "application/json";
	}

	// override async post<TResult>(path: string, body?: any) {
	// 	console.log("Making POST to:", path);
	// 	console.log("Headers:", this.willSendRequest.toString());
	// 	console.log("Body:", body);
	// 	return super.post<TResult>(path, body);
	// }

	async getUserByUsername(username: string): Promise<any> {
		return await this.get<any>(`/api/v1/auth/users/${encodeURIComponent(username)}`);
	}

	async signUp(data): Promise<any> {
		const credentials = new Object(JSON.parse(JSON.stringify(data)));
		return await this.post<any>("/api/v1/auth/signup", { body: credentials });
	}

	async signIn(data): Promise<any> {
		const credentials = new Object(JSON.parse(JSON.stringify(data)));
		return await this.post<any>("/api/v1/auth/signin", { body: credentials });
	}

	async refreshToken(data): Promise<any> {
		const refresh = new Object(data);
		return await this.post<any>("/api/v1/auth/refreshToken", { body: refresh });
	}
}
