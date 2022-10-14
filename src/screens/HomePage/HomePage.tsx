import styled from "styled-components";
import ExchangeForm from "./components/ExchangeForm";

const HomeContainer = styled.div`
  height: 80%;
  margin: 0 10% 0 10%;
  background-color: #ffe;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <ExchangeForm />
    </HomeContainer>
  );
};

export default HomePage;
