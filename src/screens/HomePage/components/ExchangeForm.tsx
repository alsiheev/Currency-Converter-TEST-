import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { RatesContext } from "../../../context/RatesContextProvider";
import ExchangeInput from "./ExchangeInput";

const ExchangeFormContainer = styled.form`
  height: 80%;
  margin: 0 10% 0 10%;
  background-color: #ffe;
  display: flex;
  justify-content: center;
  padding-top: 5%;
`;

const { defaltFirstCurrency, defaltSecondCurrency } = {
  defaltFirstCurrency: "usd",
  defaltSecondCurrency: "uah",
};

const ExchangeForm = () => {
  const { isLoading, handleChange } = useContext(RatesContext);

  const [firstCurrency, setFirstCurrency] = useState(defaltFirstCurrency);
  const [secondCurrency, setSecondCurrency] = useState(defaltSecondCurrency);

  const [firstValue, setFirstValue] = useState(100);
  const [secondValue, setSecondValue] = useState(4000);

  useEffect(() => {
    handleFirstCurrencyChange({ target: { value: defaltFirstCurrency } });
  }, []);

  const handleFirstCurrencyChange = (event: any) => {
    setFirstCurrency(event.target.value);
    (async () => {
      const rate = await handleChange(event.target.value, secondCurrency);
      setSecondValue(Math.round(firstValue * rate * 100) / 100);
    })();
  };

  const handleSecondCurrencyChange = (event: any) => {
    setSecondCurrency(event.target.value);
    (async () => {
      const rate = await handleChange(event.target.value, firstCurrency);
      setFirstValue(Math.round(secondValue * rate * 100) / 100);
    })();
  };

  const handleFirstValueChange = async (event: any) => {
    setFirstValue(event.target.value);
    setSecondValue(
      Math.round(
        event.target.value *
          (await handleChange(firstCurrency, secondCurrency)) *
          100
      ) / 100
    );
  };

  const handleSeconValueChange = async (event: any) => {
    setSecondValue(event.target.value);
    setFirstValue(
      Math.round(
        event.target.value *
          (await handleChange(secondCurrency, firstCurrency)) *
          100
      ) / 100
    );
  };

  return (
    <ExchangeFormContainer>
      {isLoading ? (
        <div>. . .</div>
      ) : (
        <>
          <ExchangeInput
            handleCurrencyChange={handleFirstCurrencyChange}
            handleValueChange={handleFirstValueChange}
            currency={firstCurrency}
            value={firstValue}
          />
          <ExchangeInput
            handleCurrencyChange={handleSecondCurrencyChange}
            handleValueChange={handleSeconValueChange}
            currency={secondCurrency}
            value={secondValue}
          />
        </>
      )}
    </ExchangeFormContainer>
  );
};

export default ExchangeForm;
