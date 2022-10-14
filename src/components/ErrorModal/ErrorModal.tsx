import { useContext } from "react";
import styled from "styled-components";
import { RatesContext } from "../../context/RatesContextProvider";

const ModalContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
`;

const ErrorModal = () => {
  const { error } = useContext(RatesContext);

  return (
    <ModalContainer style={{ display: error ? "block " : "none" }}>
      <ModalContent>{error}</ModalContent>
    </ModalContainer>
  );
};

export default ErrorModal;
