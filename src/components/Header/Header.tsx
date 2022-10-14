import styled from "styled-components";
import ExchangeRatesHeader from "./ExchangeRatesHeader/ExchangeRatesHeader";
import LogoHeader from "./LogoHeader/LogoHeader";

const HeaderContainer = styled.div`
  height: 10%;
  background-color: lightgray;
  display: flex;
  justify-content: space-around;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoHeader />
      <ExchangeRatesHeader />
    </HeaderContainer>
  );
};

export default Header;
