import { mergeResolvers } from "@graphql-tools/merge";

import authResolvers from "./auth-resolver";
import orderResolvers from "./orders-resolver";
import productResolvers from "./products-resolver";

const resolvers = mergeResolvers([authResolvers, productResolvers, orderResolvers]);

export default resolvers;
