import React from "react";
import Register from "./components/Register";
import styled, { createGlobalStyle } from "styled-components";
import { GlobalStyles } from "./globalStyles/GlobalStyles";

const App = () => {
  return (
    <StyledApp>
      <GlobalStyles />
      <Register />
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem 0.5rem;
`;
