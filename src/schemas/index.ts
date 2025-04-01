import { mergeTypeDefs } from "@graphql-tools/merge";
import productTypes from "./product-types.js";
import orderTypes from "./order-types.js";

const typeDefs = mergeTypeDefs([productTypes, orderTypes]);

export default typeDefs;
