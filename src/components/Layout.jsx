import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyles } from "../globalStyles/GlobalStyles";

const Layout = () => {
  return (
    <StyledApp>
      <GlobalStyles />
      <Outlet />
    </StyledApp>
  );
};

export default Layout;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem 0.5rem;
`;
