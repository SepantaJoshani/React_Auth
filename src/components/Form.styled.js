import styled, { css } from "styled-components";
const OffScreen = css`
  position: absolute;
  left: -9999px;
`;

export const RegisterContainer = styled.section`
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ErrorMessage = styled.p`
  ${(p) =>
    p.isError
      ? css`
          background-color: lightpink;
          color: firebrick;
          font-weight: bold;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
        `
      : OffScreen}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
`;

export const InstructionTxt = styled.p`
  ${(p) =>
    p.isVisible
      ? css`
          font-size: 0.75rem;
          border-radius: 0.5rem;
          background: #000;
          color: #fff;
          padding: 0.25rem;
          position: relative;
          bottom: -10px;
        `
      : OffScreen}

  & > svg {
    margin-right: 0.25rem;
  }
`;

export const StyledSpan = styled.span`
  display: inline-block;
`;
