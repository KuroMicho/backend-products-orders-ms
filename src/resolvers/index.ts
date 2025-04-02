import { mergeResolvers } from "@graphql-tools/merge";

import orderResolvers from "./orders-resolver";
import productResolvers from "./products-resolver";

const resolvers = mergeResolvers([productResolvers, orderResolvers]);

export default resolvers;