import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import ExchangeRates from "./ExchangeRates";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ExchangeRates />
    </ApolloProvider>
  );
};

export default App;
