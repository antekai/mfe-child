import { useQuery } from "@apollo/client";
import { EXCHANGE_RATES } from "./queries";

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="ara-child-css">
      <h1>Child: {process.env.REACT_APP_TITLE}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)" }}>
        {data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            {currency}: {rate}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRates;
