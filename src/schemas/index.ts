import { mergeTypeDefs } from "@graphql-tools/merge";

import orderTypes from "./order-types";
import productTypes from "./product-types";

const typeDefs = mergeTypeDefs([productTypes, orderTypes]);

export default typeDefs;
