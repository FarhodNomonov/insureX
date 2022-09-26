import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: red;
`;
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
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #586c79a1;
  z-index: 9999;
  overflow: auto;
`;
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: #fff;
  min-width: 300px;
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1em;
  background-color: #1d3557;
  border-radius: 8px 8px 0px 0px;
`;
export const ModalHeaderIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  align-items: center;
  gap: 20px;
`;
export const ModalHeaderTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  line-height: 40px;
  margin-bottom: 40px;
`;

export const CloseButton = styled.div`
  color: #fff;
  text-decoration: none;
`;

export const SelectCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 22;
  user-select: none;
`;

export const SelectCheckboxBody = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  z-index: 2;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  padding: 30px 5px;
  padding-bottom: 21px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const SelectCheckboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  margin-top: 0.5em;
  padding: 0.5em;
  z-index: 1001;
  background: aliceblue;
  border-radius: 8px;

  label {
    p {
      font-size: 18px;
      color: #1d3557;
      max-width: 80%;
    }
  }
`;

export const FlexWrapper = styled.div`
  label {
    display: flex;
    gap: 10px;

    p {
      font-size: 18px;
      color: #1d3557;
      font-weight: bold;
    }
  }
`;

export const SelectCheckbox = styled.div`
  background: #e5e5e5;
  border: 1px solid #9eb4c1;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 15px 21px;
  z-index: 23;
  position: relative;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: #1d3557;
    font-size: 18px;
    max-width: 80%;
  }
  svg {
    transition: all 0.2s ease-in-out;
  }
  user-select: none;
`;
