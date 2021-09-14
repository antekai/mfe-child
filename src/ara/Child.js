import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import ExcangeRates from "../ExchangeRates";

const Child = () => (
  <ApolloProvider client={client}>
    <ExcangeRates />
  </ApolloProvider>
);

export default Child;
