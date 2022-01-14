import { ApolloClient, InMemoryCache } from "@apollo/client";
import { envInformation } from "./envInfo";

const GQLFetcher = new ApolloClient({
    uri: `${envInformation.ERPBACK_URL}graphql/`,
    cache: new InMemoryCache()
});

export default GQLFetcher;