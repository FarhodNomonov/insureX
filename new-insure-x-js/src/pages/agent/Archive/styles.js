import styled from "styled-components";

export const AgentArchiveTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  h1 {
    font-weight: 500;
    font-size: 28px;
    color: #000000;
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0px;
  margin: 20px auto;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchWrapper = styled.label`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  width: 50%;
  min-width: 300px;
  margin-bottom: 40px;

  input {
    border: none;
    outline: none;
    flex: 1;
    padding: 0 10px;
    font-size: 22px;
    color: #000;
    width: 80%;

    &:focus + svg path {
      stroke: #000;
    }
  }
`;

export const MessagesWrapper = styled.div`
  .isloading {
    position: relative;
    background: #ddd;
    min-width: 300px;
    height: 50px;

    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #ddd, #fff, #ddd);
      animation: loading 1s linear infinite;
      background-position: 0 0;
      background-repeat: no-repeat;

      @keyframes loading {
        0% {
          background-size: 0% 100%;
        }
        100% {
          background-size: 100% 100%;
        }
      }
    }
  }
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
`;

export const MessageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 0;
  border-top: 2px dashed #9eb4c1;

  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    gap: 5px;
    margin-bottom: 10px;

    small {
      font-weight: 400;
      font-size: 18px;
      color: #5c6a73;
      min-width: 95px;
    }
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      color: #1d3557;
    }
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 40px;

  .text__message {
    font-weight: 600;
    font-size: 18px;
    text-align: right;
    color: #000000;
    padding-right: 10px;
  }
  p.text__message {
    white-space: pre-wrap;
    background-color: white;
    -webkit-user-modify: read-only;
    word-wrap: break-word;
  }
`;
