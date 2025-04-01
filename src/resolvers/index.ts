import { mergeResolvers } from "@graphql-tools/merge";

import productResolvers from "./products-resolver.js";
import orderResolvers from "./orders-resolver.js";

const resolvers = mergeResolvers([productResolvers, orderResolvers]);

export default resolvers;