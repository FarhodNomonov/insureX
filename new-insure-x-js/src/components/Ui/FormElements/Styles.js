import styled from "styled-components";

export const WrapperInput = styled.div`
  position: relative;
  margin-bottom: 1em;
  width: 100%;
  margin-top: 1em;

  *::-webkit-outer-spin-button,
  *::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Input = styled.div`
  position: relative;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 100%;
  height: 60px;
  padding: 0 0.8em;
  font-size: 24px;
  text-align: right;
  font-weight: 200;
`;

export const FormBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 14px;
`;

export const Select = styled(Input)`
  background: #e5e5e5;
  border: 1px solid #9eb4c1;
  box-sizing: border-box;
  border-radius: 8px;
  position: relative;
  align-items: center;
  user-select: none;
  padding: 0;
  & [class*="placeholder"] {
    font-weight: 200;
  }
`;
