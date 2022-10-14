import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { RatesContext } from "../../../context/RatesContextProvider";

const ExchangeRatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CurrencyRatesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RatesItem = styled.div`
  &:not(:last-child) {
    padding-right: 10px;
  }
`;

const ExchangeRatesHeader = () => {
  const { isLoading, handleChange } = useContext(RatesContext);

  const [rates, setRates] = useState({ usd: 0, eur: 0 });

  useEffect(() => {
    (async () => {
      const rate1 = await handleChange("usd", "uah");
      const rate2 = await handleChange("eur", "uah");
      setRates({
        usd: Math.round(rate1 * 100) / 100,
        eur: Math.round(rate2 * 100) / 100,
      });
    })();
  }, [handleChange]);

  return isLoading ? (
    <div>. . .</div>
  ) : (
    <ExchangeRatesContainer>
      <CurrencyRatesContainer>
        <RatesItem>USD</RatesItem>
        <RatesItem>{rates.usd}</RatesItem>
        <RatesItem>UAH</RatesItem>
      </CurrencyRatesContainer>
      <CurrencyRatesContainer>
        <RatesItem>EUR</RatesItem>
        <RatesItem>{rates.eur}</RatesItem>
        <RatesItem>UAH</RatesItem>
      </CurrencyRatesContainer>
    </ExchangeRatesContainer>
  );
};

export default ExchangeRatesHeader;
