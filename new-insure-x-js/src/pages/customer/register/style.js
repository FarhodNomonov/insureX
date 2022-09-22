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
  user-select: none;
`;
export const ModalContent = styled.div`
  z-index: 99999;
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
  flex-direction: row-reverse;
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

export const BackClose = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
