import { mergeTypeDefs } from "@graphql-tools/merge";

import authTypes from "./auth-types";
import orderTypes from "./order-types";
import productTypes from "./product-types";

const typeDefs = mergeTypeDefs([authTypes, orderTypes, productTypes]);

export default typeDefs;
