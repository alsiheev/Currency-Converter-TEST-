import React, { useState } from "react";
import styled from "styled-components";

const ExchangeInputContainer = styled.div`
  &:not(:last-child) {
    padding-right: 20px;
  }
  display: flex;
  flex-direction: column;
`;

const ExchangeInputSelect = styled.select`
  padding: 10px;
  margin-bottom: 7px;
`;

const ExchangeInputNumber = styled.input`
  padding: 10px;
`;

const ExchangeInput = (props: any) => {
  const { currency, value, handleCurrencyChange, handleValueChange } = props;

  return (
    <ExchangeInputContainer>
      <ExchangeInputSelect value={currency} onChange={handleCurrencyChange}>
        <option value="uah">UAH</option>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
      </ExchangeInputSelect>
      <ExchangeInputNumber
        type={"number"}
        value={value.toString()}
        onChange={handleValueChange}
      />
    </ExchangeInputContainer>
  );
};

export default ExchangeInput;
